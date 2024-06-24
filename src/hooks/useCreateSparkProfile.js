import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";
import useSparkStore from "../store/sparkStore";
import useGetSparkProfileById from "./useGetSparkProfileById";

const useCreateSparkProfile = () => {
	const [isUpdating, setIsUpdating] = useState(false);

	const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
	const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

    const sparkUser = useGetSparkProfileById(authUser.uid);
    const setSparkProfile = useSparkStore((state) => state.setSparkProfile);

	const showToast = useShowToast();

	const editSparkProfile = async (inputs, selectedFile) => {
		if (isUpdating || !authUser) return;
		setIsUpdating(true);

		const storageRef = ref(storage, `sparkProfilePics/${authUser.uid}`);
		const userDocRef = doc(firestore, "users", authUser.uid);
        const sparkDocRef = doc(firestore, "spark", authUser.uid);

		let URL = "";
		try {
			if (selectedFile) {
				await uploadString(storageRef, selectedFile, "data_url");
				URL = await getDownloadURL(ref(storage, `sparkProfilePics/${authUser.uid}`));
			}

			const updatedSpark = {
				...sparkUser,
                uid: authUser.uid,
                name: inputs.name || (authUser && sparkUser.name) || '',
                created: true,
                birthday: inputs.birthday || (authUser && sparkUser.birthday) || '',
                work: inputs.work || (authUser && sparkUser.work) || '',
                school: inputs.school || (authUser && sparkUser.school) || '',
                gender: inputs.gender || (authUser && sparkUser.gender) || '',
                interested_in: inputs.interested_in ? inputs.interested_in.split(',') : (authUser && sparkUser.interested_in) || [],
                location: inputs.location || (authUser && sparkUser.location) || '',
                hometown: inputs.hometown || (authUser && sparkUser.hometown) || '',
                ethnicity: inputs.ethnicity || (authUser && sparkUser.ethnicity) || '',
                height: parseInt(inputs.height, 10) || (authUser && sparkUser.height) || 0,
                exercise: inputs.exercise || (authUser && sparkUser.exercise) || '',
                education_level: inputs.education_level || (authUser && sparkUser.education_level) || '',
                drinking: inputs.drinking || (authUser && sparkUser.drinking) || '',
                smoking: inputs.smoking || (authUser && sparkUser.smoking) || '',
                cannabis: inputs.cannabis || (authUser && sparkUser.cannabis) || '',
                looking_for: inputs.looking_for || (authUser && sparkUser.looking_for) || '',
                family_plans: inputs.family_plans || (authUser && sparkUser.family_plans) || '',
                have_kids: inputs.have_kids || (authUser && sparkUser.have_kids) || '',
                star_sign: inputs.star_sign || (authUser && sparkUser.star_sign) || '',
                politics: inputs.politics || (authUser && sparkUser.politics) || '',
                religion: inputs.religion || (authUser && sparkUser.religion) || '',
                pronouns: inputs.pronouns ? inputs.pronouns.split(',') : (authUser && sparkUser.pronouns) || [],
                languages: inputs.languages ? inputs.languages.split(',') : (authUser && sparkUser.languages) || [],
                photos: (authUser && authUser.spark.photos) || [],
                interests: inputs.interests ? inputs.interests.split(',') : (authUser && sparkUser.interests) || [],
             
			};

			await updateDoc(sparkDocRef, updatedSpark);
			localStorage.setItem("spark-info", JSON.stringify(updatedUser));
			setSparkProfile(updatedSpark);
			//setUserProfile(updatedUser);
			showToast("Success", "Profile updated successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return { editSparkProfile, isUpdating };
};

export default useCreateSparkProfile;
