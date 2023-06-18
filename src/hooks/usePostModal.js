import { useContext } from "react";
import { PostModalContext } from "../context/post-modal";

export default function usePostModal() {
    const context = useContext(PostModalContext);
    if (!context) {
        throw new Error('usePostModal must be used within a PostModalProvider')
    }
    return context
}