import { BRollAnnotation } from '../types/BRollAnnotation';

export const getBRollAnnotations = async () => {
  const annotations: Array<BRollAnnotation> = [
    {
      id: '1',
      videoId: '1',
      videoTitle: 'Fire',
      thumbnailUrl: '/fire.jpg',
      commentIds: ['1', '2,']
    },
    {
      id: '2',
      videoId: '2',
      videoTitle: 'Ice',
      thumbnailUrl: '/ice.jpg',
      commentIds: ['3', '4,']
    }
  ];
  return annotations;
};

export const createBRollAnnotation = async (
  videoId: string,
  videoTitle: string,
  thumbnailUrl: string
) => {
  const newAnnotation: BRollAnnotation = {
    id: Math.random().toString(36).substr(2, 9),
    videoId,
    videoTitle,
    thumbnailUrl,
    commentIds: []
  };
  return newAnnotation;
};

export const deleteBRollAnnotation = async () => {
  return {};
};
