import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select as ChakraSelect,
  Stack,
  Checkbox,
  CheckboxGroup,
  Image,
  Heading,
} from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";
import useCreateSparkProfile from "../../hooks/useCreateSparkProfile";
import useGetSparkProfileById from "../../hooks/useGetSparkProfileById";
import Select from "react-select";
import languagesData from "../../../languages/languages.json";





const CreateSpark = () => {
  const authUser = useAuthStore((state) => state.user);

  if (!authUser) return null;

  const { sparkProfile } = useGetSparkProfileById(authUser?.uid);
  const { isUpdating, editSparkProfile } = useCreateSparkProfile();

  const [formData, setFormData] = useState({
    name: sparkProfile?.name || "",
    birthday: sparkProfile?.birthday || "",
    work: sparkProfile?.work || "",
    school: sparkProfile?.school || "",
    gender: sparkProfile?.gender || "",
    interested_in: sparkProfile?.interested_in || [],
    location: sparkProfile?.location || "",
    hometown: sparkProfile?.hometown || "",
    ethnicity: sparkProfile?.ethnicity || "",
    height: sparkProfile?.height || "",
    exercise: sparkProfile?.exercise || "",
    education_level: sparkProfile?.education_level || "",
    drinking: sparkProfile?.drinking || "",
    smoking: sparkProfile?.smoking || "",
    cannabis: sparkProfile?.cannabis || "",
    looking_for: sparkProfile?.looking_for || "",
    family_plans: sparkProfile?.family_plans || "",
    have_kids: sparkProfile?.have_kids || "",
    star_sign: sparkProfile?.star_sign || "",
    politics: sparkProfile?.politics || "",
    religion: sparkProfile?.religion || "",
    pronouns: sparkProfile?.pronouns || [],
    languages: sparkProfile?.languages || [],
    interests: sparkProfile?.interests || [],
    profilePic: null,
  });

  const [preview, setPreview] = useState(null);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name, values) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: values,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData((prevState) => ({
          ...prevState,
          profilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editSparkProfile(formData);
    console.log("Profile updated", formData);
  };

//   const genderOptions = [
//     { value: "male", label: "Male" },
//     { value: "female", label: "Female" },
//     { value: "other", label: "Other" },
//   ];

  const genderOptions = ["Male", "Female", "Other"];

  const handleGenderChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      gender: selectedOption.value,
    }));
  };

  const handleGenderClick = (gender) => {
    setFormData((prevState) => ({
      ...prevState,
      gender: prevState.gender === gender ? "" : gender,
    }));
  };

  const interestedInOptions = ["Women", "Men", "Trans women", "Trans men", "Non-binary"];

  const handleInterestedInClick = (interestedIn) => {
    setFormData((prevState) => {
      const currentInterestedIn = [...prevState.interested_in];
      if (currentInterestedIn.includes(interestedIn)) {
        // Remove the option if it's already selected
        return { ...prevState, interested_in: currentInterestedIn.filter((e) => e !== interestedIn) };
      } else {
        // Add the option if it's not already selected
        return { ...prevState, interested_in: [...currentInterestedIn, interestedIn] };
      }
    });
  };

//   const preloadSelectedLanguages = (sparkProfile ? sparkProfile.languages : "") => {
//     setFormData((prevState) => ({
//         ...prevState,
//         languages: 
//     }))
//   }

//LANGUAGES

    const predefinedLanguages = languagesData.map((language) => ({
    label: language.name,
    value: language.name,
    }));


  const handleLanguageChange = (selectedOptions) => {
    setFormData((prevState) => ({
      ...prevState,
      languages: selectedOptions.map((option) => option.value),
    }));
  };

  const filterLanguages = (candidate, input) => {
    return candidate.label.toLowerCase().startsWith(input.toLowerCase());
  };

  //INTEREST EMOJIS

  const emojiOptions = [
    "🎨",
    "🎵",
    "⚽️",
    "🎮",
    "📚",
    "🍔",
    "✈️",
    "🏕️",
    "🎥",
    "🖥️",
    "💃",
    "🧘",
    "🏋️",
    "🎧",
    "🧩",
  ];

  const handleEmojiClick = (emoji) => {
    setFormData((prevState) => {
      const currentInterests = [...prevState.interests];
      if (currentInterests.includes(emoji)) {
        // Remove the emoji if it's already selected
        return { ...prevState, interests: currentInterests.filter((e) => e !== emoji) };
      } else if (currentInterests.length < 7) {
        // Add the emoji if less than 7 are selected
        return { ...prevState, interests: [...currentInterests, emoji] };
      } else {
        return prevState; // Do nothing if already 7 are selected
      }
    });
  };

  

  
  return (
    <Container maxW="container.md" mb={{ base: "10vh", md: "60px" }}>
      <Heading as="h1" textAlign="center" mb={6}>
        Create Your Spark Profile
      </Heading>
      <Box as="form" onSubmit={handleSubmit} p={4} boxShadow="md" borderRadius="md">
        <Stack spacing={4}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name || (sparkProfile ? sparkProfile.name : "")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="profile-pic">
            <FormLabel>Profile Picture</FormLabel>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && (
              <Image src={preview} alt="Profile Picture Preview" boxSize="150px" mt={2} />
            )}
          </FormControl>

          <FormControl id="birthday">
            <FormLabel>Birthday</FormLabel>
            <Input
              type="date"
              name="birthday"
              value={formData.birthday || (sparkProfile ? sparkProfile.birthday : "")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="work">
            <FormLabel>Work</FormLabel>
            <Input
              type="text"
              name="work"
              value={formData.work || (sparkProfile ? sparkProfile.work : "")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="school">
            <FormLabel>School</FormLabel>
            <Input
              type="text"
              name="school"
              value={formData.school || (sparkProfile ? sparkProfile.school : "")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="gender">
        <FormLabel>Gender</FormLabel>
        <Box display="flex" flexWrap="wrap">
          {genderOptions.map((gender) => (
            <Button
              key={gender}
              onClick={() => handleGenderClick(gender)}
              colorScheme={formData.gender === gender ? "orange" : "gray"}
              variant={formData.gender === gender ? "solid" : "outline"}
              m={1}
            >
              {gender}
            </Button>
          ))}
        </Box>
      </FormControl>

          <FormControl id="interested_in">
            <FormLabel>Interested In</FormLabel>
            <Box display="flex" flexWrap="wrap">
              {interestedInOptions.map((interestedIn) => (
                <Button
                  key={interestedIn}
                  onClick={() => handleInterestedInClick(interestedIn)}
                  colorScheme={formData.interested_in.includes(interestedIn) ? "orange" : "gray"}
                  variant={formData.interested_in.includes(interestedIn) ? "solid" : "outline"}
                  m={1}
                >
                  {interestedIn}
                </Button>
              ))}
            </Box>
          </FormControl>

          <FormControl id="location">
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              name="location"
              value={formData.location || (sparkProfile ? sparkProfile.location : "")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="hometown">
            <FormLabel>Hometown</FormLabel>
            <Input
              type="text"
              name="hometown"
              value={formData.hometown || (sparkProfile ? sparkProfile.hometown : "")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="ethnicity">
            <FormLabel>Ethnicity</FormLabel>
            <Input
              type="text"
              name="ethnicity"
              value={formData.ethnicity || (sparkProfile ? sparkProfile.ethnicity : "")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="height">
            <FormLabel>Height</FormLabel>
            <Input
              type="number"
              name="height"
              value={formData.height || (sparkProfile ? sparkProfile.height : "")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="exercise">
            <FormLabel>Exercise</FormLabel>
            <Input
              type="text"
              name="exercise"
              value={formData.exercise || (sparkProfile ? sparkProfile.exercise : "")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="education_level">
            <FormLabel>Education Level</FormLabel>
            <Input
              type="text"
              name="education_level"
              value={formData.education_level || (sparkProfile ? sparkProfile.education_level : "")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="drinking">
            <FormLabel>Drinking</FormLabel>
            <Input
              type="text"
              name="drinking"
              value={formData.drinking || (sparkProfile ? sparkProfile.drinking : "")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="smoking">
            <FormLabel>Smoking</FormLabel>
            <Input
              type="text"
              name="smoking"
              value={formData.smoking || (sparkProfile ? sparkProfile.smoking : "")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="cannabis">
            <FormLabel>Cannabis</FormLabel>
            <Input
              type="text"
              name="cannabis"
              value={formData.cannabis || (sparkProfile ? sparkProfile.cannabis : "")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="looking_for">
            <FormLabel>Looking For</FormLabel>
            <Input
              type="text"
              name="looking_for"
              value={formData.looking_for || (sparkProfile ? sparkProfile.looking_for : "")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="family_plans">
            <FormLabel>Family Plans</FormLabel>
            <Input
              type="text"
              name="family_plans"
              value={formData.family_plans || (sparkProfile ? sparkProfile.family_plans : "")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="have_kids">
            <FormLabel>Have Kids</FormLabel>
            <Input
              type="text"
              name="have_kids"
              value={formData.have_kids || (sparkProfile ? sparkProfile.have_kids : "")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="star_sign">
            <FormLabel>Star Sign</FormLabel>
            <Input
              type="text"
              name="star_sign"
              value={formData.star_sign || (sparkProfile ? sparkProfile.star_sign : "")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="politics">
            <FormLabel>Politics</FormLabel>
            <Input
              type="text"
              name="politics"
              value={formData.politics || (sparkProfile ? sparkProfile.politics : "")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="religion">
            <FormLabel>Religion</FormLabel>
            <Input
              type="text"
              name="religion"
              value={formData.religion || (sparkProfile ? sparkProfile.religion : "")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="pronouns">
            <FormLabel>Pronouns</FormLabel>
            <Select
              isMulti
              name="pronouns"
              options={[
                { value: "he/him", label: "he/him" },
                { value: "she/her", label: "she/her" },
                { value: "they/them", label: "they/them" },
              ]}
              value={formData.pronouns.map((pronoun) => ({ label: pronoun, value: pronoun }))}
              onChange={(selectedOptions) =>
                setFormData((prevState) => ({
                  ...prevState,
                  pronouns: selectedOptions ? selectedOptions.map((option) => option.value) : [],
                }))
              }
            />
          </FormControl>

          <FormControl id="languages">
            <FormLabel>Languages</FormLabel>
            <Select
              isMulti
              name="languages"

              styles={{
                control: (provided) => ({
                  ...provided,
                  borderColor: 'blue', // Customizing border color
                  boxShadow: 'none', // Removing box shadow
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? 'sandybrown' : state.isFocused ? 'sandybrown' : 'white', // Customizing option background color for selected and focused states
                  color: state.isSelected || state.isFocused ? 'white' : 'black', // Customizing option text color
                }),
                input: (provided) => ({
                  ...provided,
                  color: 'black', // Customizing input text color
                }),
              }}

              options={predefinedLanguages}
              value={(formData.languages || (sparkProfile ? sparkProfile.languages : "")).map((lang) => ({ label: lang, value: lang }))}
              onChange={handleLanguageChange}
              filterOption={filterLanguages}
              placeholder="Type or select languages..."
            />
          </FormControl>

          <FormControl id="interests">
            <FormLabel>Interests</FormLabel>
            <Box display="flex" flexWrap="wrap">
              {emojiOptions.map((emoji) => (
                <Button
                  key={emoji}
                  onClick={() => handleEmojiClick(emoji)}
                  colorScheme={formData.interests.includes(emoji) ? "blue" : "gray"}
                  m={1}
                >
                  {emoji}
                </Button>
              ))}
            </Box>
          </FormControl>

          <Button type="submit" colorScheme="teal" isLoading={isUpdating}>
            Update Profile
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default CreateSpark;
