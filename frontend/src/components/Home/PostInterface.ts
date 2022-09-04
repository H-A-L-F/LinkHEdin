import { UserInterface } from "../Profile/UserInterface";

export interface PostInterface {
  AttachmentLink: string;
  AttachmentType: string;
  User: UserInterface;
  comments: number;
  createdAt: string;
  hashtag: [string];
  id: string;
  likes: number;
  sends: number;
  text: string;
  __typename: string;
}
