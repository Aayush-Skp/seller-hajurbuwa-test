import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react';

const Editor = () => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={'hello'}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log(data);
      }}
    />
  );
};

export default Editor;
