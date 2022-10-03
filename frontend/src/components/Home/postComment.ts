import { UserInterface } from "../Profile/UserInterface";

export interface PostCommentInterface {
    ID: string,
    Likes: number,
    PostID: string,
    Replies: any[],
    Text: string,
    User: UserInterface,
    __typename: "Comment"
}

export interface PostReplyInterface {
    CommentId: string,
    ID: string,
    Likes: number,
    Text: string
    User: UserInterface,
    Replies: PostReplyInterface[],
    __typename: "ReplyComment"
}