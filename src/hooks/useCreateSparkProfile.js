import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";

const useCreateSparkProfile = () => {
	const [isUpdating, setIsUpdating] = useState(false);

	const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
	const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

	const showToast = useShowToast();

	const editProfile = async (inputs) => {
		if (isUpdating || !authUser) return;
		setIsUpdating(true);

		const storageRef = ref(storage, `profilePics/${authUser.uid}`);
		const userDocRef = doc(firestore, "users", authUser.uid);

		let URL = "";
		try {
			if (selectedFile) {
				await uploadString(storageRef, selectedFile, "data_url");
				URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
			}

			const updatedUser = {
				...authUser,
                uid: newUser.uid,
                created: true,
                birthday: inputs.birthday || (authUser && authUser.spark.birthday) || '',
                work: inputs.work || (authUser && authUser.spark.work) || '',
                school: inputs.school || (authUser && authUser.spark.school) || '',
                gender: inputs.gender || (authUser && authUser.spark.gender) || '',
                interested_in: inputs.interested_in ? inputs.interested_in.split(',') : (authUser && authUser.spark.interested_in) || [],
                location: inputs.location || (authUser && authUser.spark.location) || '',
                hometown: inputs.hometown || (authUser && authUser.spark.hometown) || '',
                ethnicity: inputs.ethnicity || (authUser && authUser.spark.ethnicity) || '',
                height: parseInt(inputs.height, 10) || (authUser && authUser.spark.height) || 0,
                exercise: inputs.exercise || (authUser && authUser.spark.exercise) || '',
                education_level: inputs.education_level || (authUser && authUser.spark.education_level) || '',
                drinking: inputs.drinking || (authUser && authUser.spark.drinking) || '',
                smoking: inputs.smoking || (authUser && authUser.spark.smoking) || '',
                cannabis: inputs.cannabis || (authUser && authUser.spark.cannabis) || '',
                looking_for: inputs.looking_for || (authUser && authUser.spark.looking_for) || '',
                family_plans: inputs.family_plans || (authUser && authUser.spark.family_plans) || '',
                have_kids: inputs.have_kids || (authUser && authUser.spark.have_kids) || '',
                star_sign: inputs.star_sign || (authUser && authUser.spark.star_sign) || '',
                politics: inputs.politics || (authUser && authUser.spark.politics) || '',
                religion: inputs.religion || (authUser && authUser.spark.religion) || '',
                pronouns: inputs.pronouns ? inputs.pronouns.split(',') : (authUser && authUser.spark.pronouns) || [],
                languages: inputs.languages ? inputs.languages.split(',') : (authUser && authUser.spark.languages) || [],
                photos: (authUser && authUser.spark.photos) || [],
                interests: inputs.interests ? inputs.interests.split(',') : (authUser && authUser.spark.interests) || [],
             
			};

			await updateDoc(userDocRef, updatedUser);
			localStorage.setItem("user-info", JSON.stringify(updatedUser));
			setAuthUser(updatedUser);
			setUserProfile(updatedUser);
			showToast("Success", "Profile updated successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return { editProfile, isUpdating };
};

export default useCreateSparkProfile;
