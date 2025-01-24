import { ImageSourcePropType } from 'react-native';

type MockAuthorItem = {
  id: string;
  name: string;
  surname: string;
  nickname: string;
  icon: ImageSourcePropType | null;
};

type ReplyMockItem = {
  recipientId: string;
  content: string;
  author: MockAuthorItem;
};

type CommentMockItem = {
  content: string;
  author: MockAuthorItem;
  replies: ReplyMockItem[] | null;
};

type MockItem = {
  id: string;
  title: string | null;
  description: string | null;
  image: ImageSourcePropType;
  likes: number;
  comments: CommentMockItem[] | null;
  author: MockAuthorItem;
};

const shuffle = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const getMock = ({ toShuffle }: { toShuffle?: boolean } = {}): MockItem[] => {
  const images: ImageSourcePropType[] = [
    require('@/assets/mock/images/photo_14.jpg'),
    require('@/assets/mock/images/photo_12.jpg'),
    require('@/assets/mock/images/photo_13.jpg'),
    require('@/assets/mock/images/photo_6.jpg'),
    require('@/assets/mock/images/photo_1.jpg'),
    require('@/assets/mock/images/photo_7.jpg'),
    require('@/assets/mock/images/photo_3.jpg'),
    require('@/assets/mock/images/photo_5.jpg'),
    require('@/assets/mock/images/photo_9.jpg'),
    require('@/assets/mock/images/photo_2.jpg'),
    require('@/assets/mock/images/photo_11.jpg'),
    require('@/assets/mock/images/photo_10.jpg'),
    require('@/assets/mock/images/photo_4.jpg'),
    require('@/assets/mock/images/photo_8.jpg')
  ];

  const generateAuthor = (index: number): MockAuthorItem => {
    const hasIcon = Math.random() > 0.7; // 30% шанс, что будет иконка
    return {
      id: `author-${index}`,
      name: `Name${index}`,
      surname: `Surname${index}`,
      nickname: `nickname${index}`,
      icon: hasIcon ? require(`@/assets/mock/icon/icon_1.jpg`) : null
    };
  };

  const generateReplies = (count: number): ReplyMockItem[] => {
    return Array.from({ length: count }, (_, index) => ({
      recipientId: `recipient-${index + 1}`,
      content: `Reply content ${index + 1}`,
      author: generateAuthor(index + 100)
    }));
  };

  const generateComments = (count: number): CommentMockItem[] => {
    return Array.from({ length: count }, (_, index) => ({
      content: `Comment content ${index + 1}`,
      author: generateAuthor(index + 50),
      replies: Math.random() > 0.5 ? generateReplies(Math.floor(Math.random() * 3) + 1) : null
    }));
  };

  const mock = images.map((image, index) => ({
    id: `item-${index + 1}`,
    title: Math.random() > 0.5 ? `Title ${index + 1}` : null,
    description: Math.random() > 0.5 ? `Description for item ${index + 1}` : null,
    image,
    likes: Math.floor(Math.random() * 1000),
    comments: Math.random() > 0.5 ? generateComments(Math.floor(Math.random() * 5) + 1) : null,
    author: generateAuthor(index + 1)
  }));

  return toShuffle ? shuffle(mock) : mock;
};

export const mock = getMock();
