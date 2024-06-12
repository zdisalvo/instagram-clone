import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import usePostStore from "../store/postStore";
import useGetUserProfileByUsername from "./useGetUserProfileByUsername";

const useGetUserPostsFeed = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const { isLoading: profileLoading, userProfile } = useGetUserProfileByUsername(username);

  useEffect(() => {
    const getUserPosts = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(firestore, "posts"),
          where("createdBy", "==", userProfile.uid)
        );
        const querySnapshot = await getDocs(q);
        const userPosts = [];
        querySnapshot.forEach((doc) => {
          userPosts.push({ id: doc.id, ...doc.data() });
        });
        userPosts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(userPosts);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (username) getUserPosts();
    // if (username) console.log(posts.length);
  }, [username, showToast, setPosts, authUser, profileLoading, userProfile]);

  return { isLoading, posts };
};

export default useGetUserPostsFeed;
