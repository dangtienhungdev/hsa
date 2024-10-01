import { useQuery } from '@tanstack/react-query';
import { Col, Empty, Row } from 'antd';
import { Link, createSearchParams, useParams } from 'react-router-dom';

import { sectionApi } from '@/api/section.api';
import { Card, CardTitle } from '@/components/ui/cart';
import { cn } from '@/libs/cn';
import pathUrl from '@/utils/path.util';

const ContentExam = () => {
  const { examId } = useParams();

  const { data: dataSections, isLoading } = useQuery({
    queryKey: ['sections'],
    queryFn: () => sectionApi.getAllSections(),
  });

  return (
    <>
      {(dataSections?.length === 0 || isLoading) && (
        <div className={cn('h-full overflow-y-scroll scrollbar-hide flex items-center justify-center')}>
          <Empty />
        </div>
      )}
      {dataSections && dataSections?.length > 0 && (
        <Row gutter={[24, 24]}>
          {dataSections &&
            dataSections.length > 0 &&
            dataSections.map(subject => {
              const subjectId = subject.subjects.length === 1 ? subject.subjects[0].id : undefined;

              return (
                <Col span={6} key={subject.id}>
                  <Link
                    to={{
                      pathname: `${pathUrl.exams}/${examId}/${subject.id}`,
                      search: createSearchParams(
                        subjectId
                          ? {
                              subjectId: subjectId.toString(),
                              name: subject.name.toString(),
                            }
                          : {
                              name: subject.name.toString(),
                            },
                      ).toString(),
                    }}
                  >
                    <Card className="!rounded-md cursor-pointer hover:bg-blue-50">
                      <CardTitle>{subject.name}</CardTitle>
                    </Card>
                  </Link>
                </Col>
              );
            })}
        </Row>
      )}
    </>
  );
};

export default ContentExam;
