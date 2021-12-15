import React from "react";
import { useIntl } from "react-intl";

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
};

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "image",
  "color",
  "code-block"
];

// Quill Toolbar component
export const RichTextAreaToolbar = () =>
{
  const intl = useIntl();
  return (
    <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-header" defaultValue="5">
        <option value="1">{intl.formatMessage({id: 'jmix.richTextArea.headingOne'})}</option>
        <option value="2">{intl.formatMessage({id: 'jmix.richTextArea.headingTwo'})}</option>
        <option value="3">{intl.formatMessage({id: 'jmix.richTextArea.headingThree'})}</option>
        <option value="4">{intl.formatMessage({id: 'jmix.richTextArea.headingFour'})}</option>
        <option value="5">{intl.formatMessage({id: 'jmix.richTextArea.normalText'})}</option>
      </select>
    </span>
      <span className="ql-formats">
      <button className="ql-bold"/>
      <button className="ql-italic"/>
      <button className="ql-underline"/>
      <button className="ql-strike"/>
    </span>
      <span className="ql-formats">
      <button className="ql-list" value="ordered"/>
      <button className="ql-list" value="bullet"/>
      <button className="ql-indent" value="-1"/>
      <button className="ql-indent" value="+1"/>
    </span>
      <span className="ql-formats">
      <button className="ql-script" value="super"/>
      <button className="ql-script" value="sub"/>
      <button className="ql-blockquote"/>
    </span>
      <span className="ql-formats">
      <select className="ql-align"/>
      <select className="ql-color"/>
      <select className="ql-background"/>
    </span>
      <span className="ql-formats">
      <button className="ql-image"/>
      <button className="ql-video"/>
    </span>
      <span className="ql-formats">
      <button className="ql-code-block"/>
      <button className="ql-clean"/>
    </span>
    </div>
  )
};

export default RichTextAreaToolbar;
