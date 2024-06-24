import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Checkbox,
  CheckboxGroup,
  Textarea,
  Heading,
  Image,
} from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";
import useCreateSparkProfile from "../../hooks/useCreateSparkProfile";

const CreateSpark = () => {
  const authUser = useAuthStore((state) => state.user);

  if (!authUser) return;

  const { isUpdating, editSparkProfile} = useCreateSparkProfile();
  

  const [formData, setFormData] = useState({
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
    profilePic: null, // Added for profile picture
  });

  const [preview, setPreview] = useState(null); // Added for profile picture preview

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

//   const handleSubmit = async () => {
//     try {
//         await editSparkProfile(inputs, selectedFile);
//         setSelectedFile(null);
//     } catch (error) {
//         showToast("Error", error.message, "error");
//     }
// };

  return (
    <Container maxW="container.md" mb={{ base: "10vh", md: "60px" }}>
      <Heading as="h1" textAlign="center" mb={6}>
        Create Your Spark Profile
      </Heading>
      <Box as="form" onSubmit={handleSubmit} p={4} boxShadow="md" borderRadius="md">
        <Stack spacing={4}>
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
              value={formData.birthday}
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
            <Select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
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
            <Input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
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
            <CheckboxGroup
              value={formData.pronouns}
              onChange={(values) => handleCheckboxChange("pronouns", values)}
            >
              <Stack direction="row">
                <Checkbox value="he/him">He/Him</Checkbox>
                <Checkbox value="she/her">She/Her</Checkbox>
                <Checkbox value="they/them">They/Them</Checkbox>
                <Checkbox value="other">Other</Checkbox>
              </Stack>
            </CheckboxGroup>
          </FormControl>

          <FormControl id="languages">
            <FormLabel>Languages</FormLabel>
            <Textarea
              name="languages"
              value={formData.languages.join(", ")}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  languages: e.target.value.split(",").map((lang) => lang.trim()),
                }))
              }
            />
          </FormControl>

          <FormControl id="interests">
            <FormLabel>Interests</FormLabel>
            <Textarea
              name="interests"
              value={formData.interests.join(", ")}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  interests: e.target.value.split(",").map((interest) => interest.trim()),
                }))
              }
            />
          </FormControl>

          <Button type="submit" colorScheme="blue"
          onClick={handleSubmit}
          isLoading={isUpdating}>
            Sign Up
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default CreateSpark;
