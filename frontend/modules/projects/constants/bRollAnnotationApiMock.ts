import { BRollAnnotation } from '../types/BRollAnnotation';

export const getBRollAnnotations = async () => {
  const annotations: Array<BRollAnnotation> = [
    {
      id: '1',
      videoId: '1',
      videoTitle: 'The Consumer Trap',
      thumbnailUrl: '/Consumer Trap Thumbnail.png',
      commentIds: ['1', '2']
    },
    {
      id: '3',
      videoId: '3',
      videoTitle: 'The Consumer Trap: Chapter 3',
      thumbnailUrl: '/Consumer Trap Thumbnail CHAPTER 3.png',
      commentIds: ['5', '6']
    },
    {
      id: '2',
      videoId: '2',
      videoTitle: 'The Consumer Trap: Chapter 2',
      thumbnailUrl: '/Consumer Trap Thumbnail CHAPTER 2.png',
      commentIds: ['3', '4']
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
