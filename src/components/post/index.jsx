/**
 * Post component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.photo - URL of the post's photo.
 * @param {string} props.caption - Caption of the post.
 * @param {string} props.location - Location where the post was made.
 * @param {string} props.created_at - Creation date of the post.
 *
 * @example
 *
 * const post = {
 *   photo: "image.png",
 *   caption: "A test caption",
 *   location: "Test Location",
 *   created_at: "2023-01-01"
 * };
 *
 * return (
 *   <Post {...post} />
 * )
 */
export default function Post({ photo, caption, location, created_at }) {
  return (
    <div className="p-4 border-b border-gray-200">
      <img
        src={import.meta.env.VITE_SUPABASE_URL + '/' + photo}
        alt="Post"
        className="w-full h-64 object-cover mb-4 rounded-md"
      />
      <p>{caption}</p>
      <p>{location}</p>
      <p>{new Date(created_at).toLocaleDateString([], { day: '2-digit', month: 'short', year: '2-digit' })}</p>
    </div>
  )
}
