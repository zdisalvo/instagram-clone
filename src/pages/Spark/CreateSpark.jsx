import React, { useState } from "react";
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
import languagesData from "../../../languages/languages.json"

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

const predefinedLanguages = languagesData.map((language) => ({
    label: language.name,
    value: language.name,
  }));

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const CreateSpark = () => {
  const authUser = useAuthStore((state) => state.user);

  if (!authUser) return null;

  const { sparkProfile } = useGetSparkProfileById(authUser?.uid);
  const { isUpdating, editSparkProfile } = useCreateSparkProfile();

  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    work: "",
    school: "",
    gender: "",
    interested_in: [],
    location: "",
    hometown: "",
    ethnicity: "",
    height: "",
    exercise: "",
    education_level: "",
    drinking: "",
    smoking: "",
    cannabis: "",
    looking_for: "",
    family_plans: "",
    have_kids: "",
    star_sign: "",
    politics: "",
    religion: "",
    pronouns: [],
    languages: [],
    interests: [],
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

  const handleLanguageChange = (selectedOptions) => {
    setFormData((prevState) => ({
      ...prevState,
      languages: selectedOptions.map((option) => option.value),
    }));
  };

  const handleGenderChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      gender: selectedOption.value,
    }));
  };

  // Prepare language options
//   const languageOptions = allLanguages.map((language) => ({
//     label: language.name,
//     value: language.name,
//   }));

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
            <Input type="text" name="work" value={formData.work} onChange={handleChange} />
          </FormControl>

          <FormControl id="school">
            <FormLabel>School</FormLabel>
            <Input type="text" name="school" value={formData.school} onChange={handleChange} />
          </FormControl>

          <FormControl id="gender">
            <FormLabel>Gender</FormLabel>
            <Select
              name="gender"
              value={genderOptions.find((option) => option.value === formData.gender)}
              options={genderOptions}
              onChange={handleGenderChange}
            />
          </FormControl>

          <FormControl id="interested_in">
            <FormLabel>Interested In</FormLabel>
            <CheckboxGroup
              value={formData.interested_in}
              onChange={(values) => handleCheckboxChange("interested_in", values)}
            >
              <Stack direction="row">
                <Checkbox value="men">Men</Checkbox>
                <Checkbox value="women">Women</Checkbox>
                <Checkbox value="other">Other</Checkbox>
              </Stack>
            </CheckboxGroup>
          </FormControl>

          <FormControl id="location">
            <FormLabel>Location</FormLabel>
            <Input type="text" name="location" value={formData.location} onChange={handleChange} />
          </FormControl>

          <FormControl id="hometown">
            <FormLabel>Hometown</FormLabel>
            <Input
              type="text"
              name="hometown"
              value={formData.hometown}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="ethnicity">
            <FormLabel>Ethnicity</FormLabel>
            <Input
              type="text"
              name="ethnicity"
              value={formData.ethnicity}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="height">
            <FormLabel>Height</FormLabel>
            <Input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="exercise">
            <FormLabel>Exercise</FormLabel>
            <Input
              type="text"
              name="exercise"
              value={formData.exercise}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="education_level">
            <FormLabel>Education Level</FormLabel>
            <Input
              type="text"
              name="education_level"
              value={formData.education_level}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="drinking">
            <FormLabel>Drinking</FormLabel>
            <Input
              type="text"
              name="drinking"
              value={formData.drinking}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="smoking">
            <FormLabel>Smoking</FormLabel>
            <Input
              type="text"
              name="smoking"
              value={formData.smoking}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="cannabis">
            <FormLabel>Cannabis</FormLabel>
            <Input
              type="text"
              name="cannabis"
              value={formData.cannabis}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="looking_for">
            <FormLabel>Looking For</FormLabel>
            <Input
              type="text"
              name="looking_for"
              value={formData.looking_for}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="family_plans">
            <FormLabel>Family Plans</FormLabel>
            <Input
              type="text"
              name="family_plans"
              value={formData.family_plans}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="have_kids">
            <FormLabel>Have Kids</FormLabel>
            <Input
              type="text"
              name="have_kids"
              value={formData.have_kids}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="star_sign">
            <FormLabel>Star Sign</FormLabel>
            <Input
              type="text"
              name="star_sign"
              value={formData.star_sign}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="politics">
            <FormLabel>Politics</FormLabel>
            <Input
              type="text"
              name="politics"
              value={formData.politics}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="religion">
            <FormLabel>Religion</FormLabel>
            <Input
              type="text"
              name="religion"
              value={formData.religion}
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
                  backgroundColor: state.isSelected ? 'blue' : 'white', // Customizing option background color
                  color: state.isSelected ? 'white' : 'black', // Customizing option text color
                }),
                input: (provided) => ({
                  ...provided,
                  color: 'black', // Customizing input text color
                }),
              }}

              options={predefinedLanguages}
              className="basic-multi-select"
              classNamePrefix="select"
              value={formData.languages.map((lang) => ({ label: lang, value: lang }))}
              onChange={handleLanguageChange}
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
