import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react';

const Editor = () => {
  return <CKEditor editor={ClassicEditor} data={'Hello mero vai'} />;
};

export default Editor;
