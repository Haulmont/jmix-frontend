import { UploadOutlined } from '@ant-design/icons';
import { message, Spin, Upload } from 'antd';
import * as React from 'react';
import {UploadProps} from 'antd/es/upload';
import {UploadFile} from 'antd/es/upload/interface';
import './FileUpload.less';
import {FormattedMessage, useIntl} from 'react-intl';
import {
  useMainStore,
  useGetFile
} from '@haulmont/jmix-react-core';
import {ImagePreview} from './ImagePreview';
import {saveFile} from '../util/files';
import { useCallback, useState } from 'react';

export interface FileUploadProps {
  /**
   * FileRef string.
   * Сoming from antd Form field decorator.
   */
  value?: UploadFile,
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

export const FileUpload = ({disabled, render, value, onChange, enableFullWidth, ...props}: FileUploadProps) => {
  const getFile = useGetFile();
  const intl = useIntl();
  const mainStore = useMainStore();
  const [previewState, setPreviewState] = useState({
    isVisible: false,
    isLoading: false,
    fileName: '',
    objectUrl: ''
  });

  const beforeUpload = useCallback(
      file => {
        if (onChange) {
          onChange(file)
        }

        return false
      },
    [onChange],
  );

  const dropArea = () => {
    if (disabled || !mainStore.security.canUploadFiles()) {
      return null;
    }

    if (render != null) {
      return render(value?.name);
    }

    return <FileUploadDropArea fileRef={value?.name}/>;
  };

  const handleRemove = useCallback(() => {
    if (onChange) {
      onChange(null);
    }
  }, [onChange]);


  const handlePreview = useCallback((_file: UploadFile) => {
    if (!mainStore?.security?.canDownloadFiles()) {
      message.error(
        intl.formatMessage({id: 'file.download.notAllowed'})
      );
      return;
    }

    if (!value) {
      return;
    }

    const fileName: string = value.name;
    const isFileInstance = _file instanceof File;
    const isImage = isImageFile(fileName);

    if (isImage && isFileInstance) {
      setPreviewState(prev => ({
        ...prev,
        isVisible: true,
        fileName,
        objectUrl: URL.createObjectURL(_file)
      }));

      return;
    } else if (isFileInstance){
      return;
    }
    
    if (isImage) {
      // Open image in ImagePreview component
      setPreviewState(prev => ({
        ...prev,
        isVisible: true,
        isLoading: true,
        fileName
      }));
      getFile(value.uid)
        .then((blob: Blob) => {
          setPreviewState(prev => ({
            ...prev,
            objectUrl: URL.createObjectURL(blob)
          }));
        }).catch(() => {
          message.error(intl.formatMessage({id: 'jmix.file.downloadFailed'}));
          setPreviewState(prev => ({
            ...prev,
            isVisible: false
          }));
        }).finally(() => {
          setPreviewState(prev => ({
            ...prev,
            isLoading: false
          }));
        });
    } else {
      // Download file with correct filename
      const hideDownloadMessage = message.loading(intl.formatMessage({id: 'jmix.file.downloading'}));
      getFile(value.uid).then((blob: Blob) => {
        const objectUrl: string = URL.createObjectURL(blob);
        saveFile(objectUrl, fileName);
        URL.revokeObjectURL(objectUrl);
      }).catch(() => {
        message.error(intl.formatMessage({id: 'jmix.file.downloadFailed'}));
      }).finally(() => {
        hideDownloadMessage();
      });
    }
  }, [value, mainStore]);

  const handleClosePreview = useCallback(() => {
    if (previewState.objectUrl) {
      URL.revokeObjectURL(previewState.objectUrl);
    }
    setPreviewState(prev => ({
      ...prev,
      objectUrl: '',
      fileName: '',
      isVisible: false
    }));
  }, []);

  if (!mainStore || !mainStore.security.isDataLoaded) {
    return <Spin size="small"/>;
  }

  if (!mainStore.security.canUploadFiles() && !value) {
    return (
      <div className="no-file-message">
        <FormattedMessage id="file.noFile"/>
      </div>
    );
  }

  const uploadProps = {
    fileList: value ? [value] : [],
    beforeUpload,
    onRemove: handleRemove,
    disabled,
    onPreview: handlePreview,
    showUploadList: {
      showDownloadIcon: false,
      showPreviewIcon: true,
      showRemoveIcon: true,
    },
    className: enableFullWidth ? '_cuba-file-upload-full-width-enabled' : '',
    ...props.uploadProps
  };

  return <>
    <Upload
      {...uploadProps}
    >
      { dropArea() }
    </Upload>
    <ImagePreview
      {...previewState}
      onClose={handleClosePreview}
    />
  </>
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
          <FormattedMessage id='jmix.fileUpload.replace'/>
        </span>
      </div>
    )
    : (
      <div className='cuba-file-drop-area'>
        <UploadOutlined className='uploadicon' />
        <div className='uploadtext'>
          <FormattedMessage id='jmix.fileUpload.upload'/>
        </div>
      </div>
    );
}

function isImageFile(fileName: string): boolean {
  return !!fileName.match('.*(jpg|jpeg|gif|png)$');
}

