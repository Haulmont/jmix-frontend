import { UploadOutlined } from '@ant-design/icons';
import { message, Upload, Spin } from 'antd';
import * as React from 'react';
import {UploadChangeParam} from 'antd/es/upload';
import {IReactionDisposer, observable, reaction, makeObservable, action, runInAction} from 'mobx';
import {observer} from 'mobx-react';
import {UploadProps} from 'antd/es/upload';
import {UploadFile} from 'antd/es/upload/interface';
import './FileUpload.less';
import {FormattedMessage, injectIntl, WrappedComponentProps} from 'react-intl';
import {
  getJmixREST,
  injectMainStore,
  MainStoreInjected,
  MainStore,
  extractName
} from '@haulmont/jmix-react-core';
import {ImagePreview} from './ImagePreview';
import {saveFile} from '../util/files';

export interface FileUploadProps extends MainStoreInjected {
  /**
   * FileRef string.
   * Сoming from antd Form field decorator.
   */
  value?: string,
  /**
   * Сoming from antd Form field decorator
   */
  onChange?: (arg: any) => void,
  /**
   * Whether the component shall take all available width. **Default**: true.
   */
  enableFullWidth?: boolean,
  disabled?: boolean,
  /**
   * UploadProps object that is passed through to the underlying antd {@link https://ant.design/components/upload/ Upload} component
   */
  uploadProps?: UploadProps,
  /**
   * Render function that allows to customize the file drop area.
   * @param fileRef - a valid FileRef string
   */
  render?: (fileRef: string | undefined) => React.ReactNode,
}

class FileUploadComponent extends React.Component<FileUploadProps & WrappedComponentProps> {
  fileList: UploadFile[] = [];
  isPreviewVisible = false;
  isPreviewLoading = false;
  previewImageObjectUrl: string | null = null;
  previewFileName: string | null = null;

  reactionDisposers: IReactionDisposer[] = [];

  static defaultProps = {
    enableFullWidth: true
  };

  constructor(props: FileUploadProps & WrappedComponentProps) {
    super(props);

    makeObservable(this, {
      fileList: observable,
      isPreviewVisible: observable,
      isPreviewLoading: observable,
      previewImageObjectUrl: observable,
      previewFileName: observable
    });
  }

  componentDidMount(): void {
    this.reactionDisposers.push(reaction(
      () => this.props.value,
      () => {
        if (this.props.value) {
          this.fileList = [{
            uid: this.props.value,
            name: extractName(this.props.value),
            size: 0,
            type: '',
            url: '#',
          }];
        }
      }
    ));
  }

  componentWillUnmount(): void {
    this.reactionDisposers.forEach(disposer => disposer());

    runInAction(() => {
      if (this.previewImageObjectUrl != null) {
        URL.revokeObjectURL(this.previewImageObjectUrl);
      }
    });
  }

  handleChange = action((info: UploadChangeParam): void => {
    let fileList = [...info.fileList];

    fileList = fileList.slice(-1); // Limit to a single file

    if (info.file.status === 'error') {
      message.error(this.props.intl.formatMessage({id: 'cubaReact.fileUpload.uploadFailed'}));
    }

    if (info.file.status === 'done') {
      fileList[0].uid = info.file.response.fileRef;
      fileList[0].name = extractName(info.file.response.fileRef);
      fileList[0].url = '#';
      if (this.props.onChange) {
        this.props.onChange(info.file.response.fileRef);
      }
    }

    this.fileList = [ ...fileList ];
  });

  handlePreview = action((_file: UploadFile): void => {
    const {intl, mainStore} = this.props;

    if (!mainStore?.security?.canDownloadFiles()) {
      message.error(
        intl.formatMessage({id: 'file.download.notAllowed'})
      );
      return;
    }

    const fileName: string = this.fileList[0].name;
    if (isImageFile(fileName)) {
      // Open image in ImagePreview component
      this.isPreviewVisible = true;
      this.isPreviewLoading = true;
      this.previewFileName = fileName;
      getJmixREST()!.getFile(this.fileList[0].uid)
      .then(action((blob: Blob) => {
        this.previewImageObjectUrl = URL.createObjectURL(blob);
      })).catch(action(() => {
        message.error(intl.formatMessage({id: 'cubaReact.file.downloadFailed'}));
        this.isPreviewVisible = false;
      })).finally(action(() => {
        this.isPreviewLoading = false;
      }));
    } else {
      // Download file with correct filename
      const hideDownloadMessage = message.loading(intl.formatMessage({id: 'cubaReact.file.downloading'}));
      getJmixREST()!.getFile(this.fileList[0].uid).then((blob: Blob) => {
        const objectUrl: string = URL.createObjectURL(blob);
        saveFile(objectUrl, fileName);
        URL.revokeObjectURL(objectUrl);
      }).catch(() => {
        message.error(intl.formatMessage({id: 'cubaReact.file.downloadFailed'}));
      }).finally(() => {
        hideDownloadMessage();
      });
    }
  });

  handleRemove = action((_file: UploadFile) => {
    this.fileList = [];
    if (this.props.onChange) {
      this.props.onChange(null);
    }
  });

  handleClosePreview = action(() => {
    this.isPreviewVisible = false;
    if (this.previewImageObjectUrl) {
      URL.revokeObjectURL(this.previewImageObjectUrl);
    }
    this.previewImageObjectUrl = null;
    this.previewFileName = null;
  });

  dropArea = (mainStore: MainStore) => {
    const {disabled, render, value} = this.props;

    if (disabled || !mainStore.security.canUploadFiles()) {
      return null;
    }

    if (render != null) {
      return render(value);
    }

    return <FileUploadDropArea fileRef={value}/>;
  };

  render() {
    const {mainStore, disabled, enableFullWidth, uploadProps: passedUploadProps} = this.props;

    if (mainStore == null || !mainStore.security.isDataLoaded) {
      return <Spin size="small"/>;
    }

    if (!mainStore.security.canUploadFiles() && this.fileList.length === 0) {
      // To avoid empty field
      return (
        <div className="no-file-message">
          <FormattedMessage id="file.noFile"/>
        </div>
      );
    }

    const defaultUploadProps: UploadProps = {
      action: getJmixREST()!.getFileUploadURL(),
      headers: {'Authorization': 'Bearer ' + getJmixREST()!.restApiToken},
      fileList: this.fileList,
      onChange: this.handleChange,
      onPreview: this.handlePreview,
      onRemove: this.handleRemove,
      disabled,
      showUploadList: {
        showDownloadIcon: false,
        showPreviewIcon: true,
        showRemoveIcon: true,
      },
      className: enableFullWidth ? '_cuba-file-upload-full-width-enabled' : '',
    };

    const mergedUploadProps: UploadProps = { ...defaultUploadProps, ...passedUploadProps };

    return (
      <>
        <Upload
          { ...mergedUploadProps }
        >
          { this.dropArea(mainStore) }
        </Upload>
        <ImagePreview isVisible={this.isPreviewVisible}
                      isLoading={this.isPreviewLoading}
                      objectUrl={this.previewImageObjectUrl ?? undefined}
                      fileName={this.previewFileName ?? undefined}
                      onClose={this.handleClosePreview}
        />
      </>
    );
  }

}

interface FileUploadDropAreaProps {
  fileRef?: string;
}

function FileUploadDropArea(props: FileUploadDropAreaProps) {
  return props.fileRef
    ? (
      <div className='cuba-file-drop-area'>
        <UploadOutlined className='replaceicon' />
        <span className='replacetext'>
          <FormattedMessage id='cubaReact.fileUpload.replace'/>
        </span>
      </div>
    )
    : (
      <div className='cuba-file-drop-area'>
        <UploadOutlined className='uploadicon' />
        <div className='uploadtext'>
          <FormattedMessage id='cubaReact.fileUpload.upload'/>
        </div>
      </div>
    );
}

function isImageFile(fileName: string): boolean {
  return !!fileName.match('.*(jpg|jpeg|gif|png)$');
}

const fileUpload =
  injectIntl(
    injectMainStore(
      observer(
        FileUploadComponent
      )
    )
  );

export {fileUpload as FileUpload};
