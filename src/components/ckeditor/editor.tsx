import type { Dispatch, SetStateAction } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-build-classic-mathtype';

interface EditorProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Editor = ({ value, setValue }: EditorProps) => {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
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
        data={value}
        onChange={(_: any, editor: any) => {
          const data = editor.getData();

          setValue(data);
        }}
      />
    </div>
  );
};

export default Editor;
