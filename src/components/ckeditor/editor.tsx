import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-build-classic-mathtype';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';

const Editor = () => {
  const [editorData, setEditorData] = useState('');

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onReady={editor => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();

          setEditorData(data);
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
        config={{
          toolbar: {
            shouldNotGroupWhenFull: true,
            items: [
              'heading',
              'fontsize',
              'alignment',
              'fontColor',
              'fontBackgroundColor',
              'outdent',
              'indent',
              '|',
              'bold',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              'imageUpload',
              'mediaEmbed',
              'insertTable',
              'blockQuote',
              'undo',
              'redo',
              '|',
              'MathType',
              'ChemType',
            ],
          },
        }}
      />

      {JSON.stringify(editorData)}
    </div>
  );
};

export default Editor;
