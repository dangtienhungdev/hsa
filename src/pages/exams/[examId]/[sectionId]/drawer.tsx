import { Drawer } from 'antd';

import { cn } from '@/libs/cn';

interface DrawerSectionProps {
  open: { visible: boolean; data: any };
  onClose: () => void;
}

const DrawerSection = ({ open, onClose }: DrawerSectionProps) => {
  console.log(open.data);
  const { data } = open;

  return (
    <Drawer title={'Câu hỏi chi tiết'} placement="right" onClose={onClose} open={open.visible} width={700}>
      <p className="flex items-center !mb-0 gap-2">
        <span className="mb-0 font-semibold">Câu hỏi:</span>
        <span
          className="mb-0"
          dangerouslySetInnerHTML={{
            __html: data?.content_question_group || data?.question,
          }}
        />
      </p>

      {data?.type === 'group' && (
        <div className="pl-2 mt-3">
          {data?.group_questions &&
            data?.group_questions.length > 0 &&
            data?.group_questions?.map((question: any, index: number) => {
              const { options } = question;

              return (
                <div className="mt-3" key={question?.question_id}>
                  <p className="flex items-center !mb-0 gap-2">
                    <span className="mb-0 font-semibold">Câu hỏi {index + 1}:</span>
                    <span
                      className="mb-0"
                      dangerouslySetInnerHTML={{
                        __html: question?.content_question_group || question?.question,
                      }}
                    />
                  </p>

                  <div className="">
                    {options &&
                      options.length > 0 &&
                      options.map((option: any) => {
                        return (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: option?.option_text,
                            }}
                            className={cn({ 'bg-yellow-200': option.is_correct === '1' })}
                            key={option?.option_id}
                          />
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </Drawer>
  );
};

export default DrawerSection;
