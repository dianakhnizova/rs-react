import type { MyData } from '@/sources/types';

export const getAboutMeDataList = (t: (key: string) => string): MyData[] => [
  { label: t('labels.labelName'), data: t('data.dataName') },
  { label: t('labels.labelAge'), data: t('data.dataAge') },
  { label: t('labels.labelLocation'), data: t('data.dataLocation') },
  { label: t('labels.labelEducation'), data: t('data.dataEducation') },
  { label: t('labels.labelCertificate'), data: t('data.dataCertificate') },
  { label: t('labels.labelExperience'), data: t('data.dataExperience') },
  { label: t('labels.labelFreelance'), data: t('data.dataFreelance') },
  { label: t('labels.labelReadyWork'), data: t('data.dataReadyWork') },
  { label: t('labels.labelEnglish'), data: t('data.dataEnglish') },
];
