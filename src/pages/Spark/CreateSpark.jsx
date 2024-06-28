import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select as ChakraSelect,
  Stack,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";
import useCreateSparkProfile from "../../hooks/useCreateSparkProfile";
import useGetSparkProfileById from "../../hooks/useGetSparkProfileById";
import Select from "react-select";
import languagesData from "../../../json-files/languages.json";
import heightsData from "../../../json-files/heights.json";
import citiesData from "../../../json-files/worldcities2.json";
import countryCodeToFlagEmoji from 'country-code-to-flag-emoji';
import ReCAPTCHA from "react-google-recaptcha";



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
        ethnicity: [],
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
    
      // useEffect to update formData when sparkProfile changes
      useEffect(() => {
        if (sparkProfile) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            name: sparkProfile.name || "",
            birthday: sparkProfile.birthday || "",
            work: sparkProfile.work || "",
            school: sparkProfile.school || "",
            gender: sparkProfile.gender || "",
            interested_in: sparkProfile.interested_in || [],
            location: sparkProfile.location || "",
            hometown: sparkProfile.hometown || "",
            ethnicity: sparkProfile.ethnicity || [],
            height: sparkProfile.height || "",
            exercise: sparkProfile.exercise || "",
            education_level: sparkProfile.education_level || "",
            drinking: sparkProfile.drinking || "",
            smoking: sparkProfile.smoking || "",
            cannabis: sparkProfile.cannabis || "",
            looking_for: sparkProfile.looking_for || "",
            family_plans: sparkProfile.family_plans || "",
            have_kids: sparkProfile.have_kids || "",
            star_sign: sparkProfile.star_sign || "",
            politics: sparkProfile.politics || "",
            religion: sparkProfile.religion || "",
            pronouns: sparkProfile.pronouns || [],
            languages: sparkProfile.languages || [],
            interests: sparkProfile.interests || [],
            profilePic: sparkProfile.profilePic || null,
          }));
        }
      }, [sparkProfile]);

  const [preview, setPreview] = useState(null);

  

  const handleChange = (e) => {
    const { name, value } = e.target;

    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

    setFormData((prevState) => ({
      ...prevState,
      [name]: capitalizedValue,
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

//GENDER

  const genderOptions = ["Female", "Male", "Trans Female", "Trans Male", "Non-binary"];

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


  //INTERESTED IN

  const interestedInOptions = ["Women", "Men", "Trans Women", "Trans Men", "Non-binary"];

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

  //LOCATION

  const [cities, setCities] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    
    const [isTyping, setIsTyping] = useState(false);
    

    useEffect(() => {
        const formattedCities = citiesData.cities.map(city => ({
            value: `${city.city}, ${city.state}, ${city.country}, ${countryCodeToFlagEmoji(city.iso2)}`,
            label: `${city.city}, ${city.state}, ${city.country}, ${countryCodeToFlagEmoji(city.iso2)}`
        }));
        setCities(formattedCities);
    }, []);




    const handleLocationChange = (selectedOption) => {
        setSelectedLocation(selectedOption);
        setFormData({ ...formData, location: selectedOption ? selectedOption.value : '' });
    };

    const filterCitiesLocation = (candidate, input) => {
      if (isTyping && input.length > 2) {
          return candidate.label.toLowerCase().startsWith(input.toLowerCase());
      }
      return null; // or handle non-typing state behavior
  };

      const handleKeyDown = (event) => {
        // Detecting if the key pressed is a delete key or backspace
        if (event.key === 'Delete' || event.key === 'Backspace') {
            setIsTyping(false); 
            
        } 
        else {
          setIsTyping(true);
        }
    };

    //HOMETOWN

    const [selectedHometown, setSelectedHometown] = useState(null);

    const handleHometownChange = (selectedOption) => {
      setSelectedHometown(selectedOption);
      setFormData({ ...formData, hometown: selectedOption ? selectedOption.value : '' });
  };

  const filterCitiesHometown = (candidate, input) => {
    if (isTyping && input.length > 2) {
        return candidate.label.toLowerCase().startsWith(input.toLowerCase());
    }
    return null; // or handle non-typing state behavior
};
  

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: 'black',
            color: 'grey',
            borderColor: state.isFocused ? 'sandybrown' : 'grey',
            boxShadow: 'none',
            '&:hover': {
                borderColor: 'sandybrown',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#333333' : 'black',
            color: state.isSelected ? 'sandybrown' : 'grey',
            '&:hover': {
                backgroundColor: '#333333',
                color: 'sandybrown',
            },
        }),
        input: (provided) => ({
            ...provided,
            color: 'grey',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'black',
            marginTop: 0,
            borderRadius: 0,
            boxShadow: 'none',
            borderWidth: 0,
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'white',
            backgroundColor: '#333333',
            width: 'auto',
            textAlign: 'left',
            paddingLeft: '1ch'
        }),
        clearIndicator: (provided) => ({
            ...provided,
            color: 'grey',
            padding: '0px',
            '&:hover': {
                color: 'sandybrown',
            },
        }),
    };


//ETHNICITY

    const ethnicityOptions = ["Asian", "Black", "Indian", "Jewish", "Latin", "Middle Eastern", "Pacific Islander", "Persian", "White"];

    const handleEthnicityClick = (ethnicitySelection) => {
      setFormData((prevState) => {
        const currentEthnicities = [...prevState.ethnicity];
        if (currentEthnicities.includes(ethnicitySelection)) {
          // Remove the ethnicity if it's already selected
          return { ...prevState, ethnicity: currentEthnicities.filter((e) => e !== ethnicitySelection) };
        } else if (currentEthnicities.length < 5) {
          // Add the ethnicity if less than 5 are selected
          return { ...prevState, ethnicity: [...currentEthnicities, ethnicitySelection] };
        } else {
          return prevState; // Do nothing if already 7 are selected
        }
      });
    };

//HEIGHT

    const predefinedHeights = heightsData.map((height) => ({
        label: height,
        value: height,
        }));  


        const handleHeightChange = (selectedOption) => {
            setFormData((prevState) => ({
              ...prevState,
              height: selectedOption ? selectedOption.value : "", // Single value
            }));
          };
        
          const filterHeights = (candidate, input) => {
            return candidate.label.toLowerCase().startsWith(input.toLowerCase());
          };

//EXERCISE

const exerciseOptions = ["Active", "Sometimes", "Rarely"];


const handleExerciseClick = (exercise) => {
  setFormData((prevState) => ({
    ...prevState,
    exercise: prevState.exercise === exercise ? "" : exercise,
  }));
};

//EDUCATION LEVEL

const educationOptions = ["High School", "Trade/Tech School", "In College", "Undergraduate Degree", "In Grad School", "Graduate Degree", "PhD", "MD"];
        
const handleEducationClick = (education_level) => {
  setFormData((prevState) => ({
    ...prevState,
    education_level: prevState.education_level === education_level ? "" : education_level,
  }));
};

//DRINKING

const drinkingOptions = ["Often", "Socially", "On Special Occasion", "Never"];

const handleDrinkingClick = (drinking) => {
  setFormData((prevState) => ({
    ...prevState,
    drinking: prevState.drinking === drinking ? "" : drinking,
  }));
};

//SMOKING

const smokingOptions = ["Often", "Socially", "On Special Occasion", "Never"];

const handleSmokingClick = (smoking) => {
  setFormData((prevState) => ({
    ...prevState,
    smoking: prevState.smoking === smoking ? "" : smoking,
  }));
};


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
              //value={formData.name || "" || (sparkProfile ? sparkProfile.name : "")}
              value={formData.name}
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
              value={formData.birthday}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="work">
            <FormLabel>Work</FormLabel>
            <Input
              type="text"
              name="work"
              value={formData.work}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="school">
            <FormLabel>School</FormLabel>
            <Input
              type="text"
              name="school"
              value={formData.school}
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
              //colorScheme={formData.gender === gender ? "darkorange" : "#1B2328"}
              variant="solid"
              bg={formData.gender === gender ? "darkorange" : "#1B2328"}
              color={formData.gender === gender ? "black" : "white"}
              _hover={{
                bg: formData.gender === gender ? "orange" : "orange",
              }}
              size="sm"
              m={1}
            >
              {gender}
            </Button>
          ))}
        </Box>
      </FormControl>

          <FormControl id="interested_in">
          <Stack direction="row" align="baseline">
          <FormLabel>Interested In</FormLabel>
          <Text fontSize="sm" color="gray.500">
            (This will not show on your profile)
          </Text>
          </Stack>
            <Box display="flex" flexWrap="wrap">
              {interestedInOptions.map((interestedIn) => (
                <Button
                  key={interestedIn}
                  onClick={() => handleInterestedInClick(interestedIn)}
                  //colorScheme={formData.interested_in.includes(interestedIn) ? "orange" : "gray"}
                  variant="solid"
                  bg={formData.interested_in.includes(interestedIn) ? "darkorange" : "#1B2328"}
                  color={formData.interested_in.includes(interestedIn) ? "black" : "white"}
                  _hover={{
                    bg: formData.interested_in.includes(interestedIn) ? "orange" : "orange",
                  }}
                  size="sm"
                  m={1}
                >
                  {interestedIn}
                </Button>
              ))}
            </Box>
          </FormControl>

          <FormControl id="location">
            <FormLabel>Location</FormLabel>
            <Select
                name="location"
                isClearable
                styles={customStyles}
                options={cities}
                value={selectedLocation}
                onChange={handleLocationChange}
                filterOption={filterCitiesLocation}
                onKeyDown={handleKeyDown}
                placeholder="Type and select your location..."
            />
        </FormControl>

          <FormControl id="hometown">
            <FormLabel>Hometown</FormLabel>
            <Select
                name="location"
                isClearable
                styles={customStyles}
                options={cities}
                value={selectedHometown}
                onChange={handleHometownChange}
                filterOption={filterCitiesHometown}
                onKeyDown={handleKeyDown}
                placeholder="Type and select your hometown..."
            />
          </FormControl>

          <FormControl id="ethnicity">
          <Stack direction="row" align="baseline">
            <FormLabel>Ethnicity</FormLabel>
            <Text fontSize="sm" color="gray.500">
            (Select up to 5)
          </Text>
          </Stack>
            <Box display="flex" flexWrap="wrap">
              {ethnicityOptions.map((ethnicitySelection) => (
                <Button
                  key={ethnicitySelection}
                  onClick={() => handleEthnicityClick(ethnicitySelection)}
                  //colorScheme={formData.ethnicity.includes(ethnicitySelection) ? "blue" : "gray"}
                  variant="solid"
                  bg={formData.ethnicity.includes(ethnicitySelection) ? "darkorange" : "#1B2328"}
                  color={formData.ethnicity.includes(ethnicitySelection) ? "black" : "white"}
                  _hover={{
                    bg: formData.ethnicity.includes(ethnicitySelection) ? "orange" : "orange",
                  }}
                  size="sm"
                  m={1}
                >
                  {ethnicitySelection}
                </Button>
              ))}
            </Box>
          </FormControl>

          <FormControl id="height">
            <FormLabel>Height</FormLabel>
            <Select
            name="height"
            isClearable
            styles={{
            control: (provided, state) => ({
                ...provided,
                backgroundColor: 'black', // Background color of the select box
                color: 'grey', // Text color of the select box
                borderColor: state.isFocused ? 'sandybrown' : 'grey', // Border color when focused or hovered
                boxShadow: 'none', // Removing box shadow
                '&:hover': {
                borderColor: 'sandybrown', // Border color on hover
                },
            }),
            //   clearIndicator: (provided) => ({
            //     ...provided,
            //     color: 'white', // Change color to white
            //   }),
            
            option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? '#333333' : 'black', // Customizing option background color for selected state
                
                color: state.isSelected ? 'sandybrown' : 'grey', // Customizing option text color
                //fontWeight: state.isSelected ? 'bold' : 'normal', // Setting font weight when selected
                '&:hover': {
                backgroundColor: '#333333', // Background color on hover
                color: 'sandybrown', // Text color on hover
                //fontWeight: 'bold',
                },
            }),
            input: (provided) => ({
                ...provided,
                color: 'grey', // Customizing input text color
            }),
            menu: (provided) => ({
                ...provided,
                backgroundColor: 'black', // Background color of the dropdown menu
                marginTop: 0, // Removing the default margin-top
                borderRadius: 0, // Removing default border radius
                boxShadow: 'none', // Removing box shadow
                borderWidth: 0, // Removing border width
            }),
            singleValue: (provided) => ({
                ...provided,
                color: 'white', // Color of the single selected value
                backgroundColor: '#333333',
                width: '10ch', // Width to fit 10 characters
                textAlign: 'center', // Center the text
              }),
              clearIndicator: (provided) => ({
                ...provided,
                color: 'grey', // Color of the clear indicator
                position: 'absolute', // Absolute positioning
                left: '11ch', // Positioning to the right of the control box
                padding: '0px', // Removing padding to fit in smaller box
                '&:hover': {
                color: 'sandybrown', // Change color to orange on hover
                },
              }),
            }}
            options={predefinedHeights}
            value={predefinedHeights.find((height) => height.value === formData.height)}
            onChange={handleHeightChange}
            filterOption={filterHeights}
            placeholder="Type or select your height..."
        />
          </FormControl>

          <FormControl id="exercise">
            <FormLabel>Exercise</FormLabel>
            <Box display="flex" flexWrap="wrap">
          {exerciseOptions.map((exercise) => (
            <Button
              key={exercise}
              onClick={() => handleExerciseClick(exercise)}
              //colorScheme={formData.gender === gender ? "darkorange" : "#1B2328"}
              variant="solid"
              bg={formData.exercise === exercise ? "darkorange" : "#1B2328"}
              color={formData.exercise === exercise ? "black" : "white"}
              _hover={{
                bg: formData.exercise === exercise ? "orange" : "orange",
              }}
              size="sm"
              m={1}
            >
              {exercise}
            </Button>
          ))}
        </Box>
          </FormControl>

          <FormControl id="education_level">
            <FormLabel>Education Level</FormLabel>
            <Box display="flex" flexWrap="wrap">
          {educationOptions.map((education_level) => (
            <Button
              key={education_level}
              onClick={() => handleEducationClick(education_level)}
              //colorScheme={formData.gender === gender ? "darkorange" : "#1B2328"}
              variant="solid"
              bg={formData.education_level === education_level ? "darkorange" : "#1B2328"}
              color={formData.education_level === education_level ? "black" : "white"}
              _hover={{
                bg: formData.education_level === education_level ? "orange" : "orange",
              }}
              size="sm"
              m={1}
            >
              {education_level}
            </Button>
          ))}
        </Box>
          </FormControl>

          <FormControl id="drinking">
            <FormLabel>Drinking</FormLabel>
            <Box display="flex" flexWrap="wrap">
          {drinkingOptions.map((drinking) => (
            <Button
              key={drinking}
              onClick={() => handleDrinkingClick(drinking)}
              //colorScheme={formData.gender === gender ? "darkorange" : "#1B2328"}
              variant="solid"
              bg={formData.drinking === drinking ? "darkorange" : "#1B2328"}
              color={formData.drinking === drinking ? "black" : "white"}
              _hover={{
                bg: formData.drinking === drinking ? "orange" : "orange",
              }}
              size="sm"
              m={1}
            >
              {drinking}
            </Button>
          ))}
        </Box>
          </FormControl>

          <FormControl id="smoking">
            <FormLabel>Smoking</FormLabel>
            <Box display="flex" flexWrap="wrap">
          {smokingOptions.map((smoking) => (
            <Button
              key={smoking}
              onClick={() => handleSmokingClick(smoking)}
              //colorScheme={formData.gender === gender ? "darkorange" : "#1B2328"}
              variant="solid"
              bg={formData.smoking === smoking ? "darkorange" : "#1B2328"}
              color={formData.smoking === smoking ? "black" : "white"}
              _hover={{
                bg: formData.smoking === smoking ? "orange" : "orange",
              }}
              size="sm"
              m={1}
            >
              {smoking}
            </Button>
          ))}
        </Box>
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
      control: (provided, state) => ({
        ...provided,
        backgroundColor: 'black', // Background color of the select box
        color: 'grey', // Text color of the select box
        borderColor: state.isFocused ? 'sandybrown' : 'grey', // Border color when focused or hovered
        boxShadow: 'none', // Removing box shadow
        '&:hover': {
          borderColor: 'sandybrown', // Border color on hover
        },
      }),
      clearIndicator: (provided) => ({
        ...provided,
        //color: 'white', // Change color to white
        '&:hover': {
              color: 'sandybrown', // Change color to orange on hover
            },
      }),
      multiValue: provided => ({
        ...provided,
        backgroundColor: '#333333', // Background color of selected value
        color: 'white', // Text color of selected value
      }),
      multiValueLabel: provided => ({
        ...provided,
        color: 'white', // Text color of label in selected value
      }),
      multiValueRemove: (provided, state) => ({
        ...provided,
        color: 'white', // Color of remove icon in selected value
        '&:hover': {
          backgroundColor: '#333333', // Background color on hover for remove icon
          color: 'sandybrown', // Text color on hover for remove icon
        },
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#333333' : 'black', // Customizing option background color for selected state
        
        color: state.isSelected ? 'sandybrown' : 'grey', // Customizing option text color
        //fontWeight: state.isSelected ? 'bold' : 'normal', // Setting font weight when selected
        '&:hover': {
          backgroundColor: '#333333', // Background color on hover
          color: 'sandybrown', // Text color on hover
          //fontWeight: 'bold',
        },
      }),
      input: (provided) => ({
        ...provided,
        color: 'grey', // Customizing input text color
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: 'black', // Background color of the dropdown menu
        marginTop: 0, // Removing the default margin-top
        borderRadius: 0, // Removing default border radius
        boxShadow: 'none', // Removing box shadow
        borderWidth: 0, // Removing border width
      }),
      singleValue: (provided) => ({
        ...provided,
        color: 'grey', // Color of the single selected value
        backgroundColor: '#333333'
      }),
    }}
    options={predefinedLanguages}
    value={(formData.languages).map((lang) => ({ label: lang, value: lang }))}
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

          <Button type="submit" colorScheme="orange" isLoading={isUpdating}>
            Update Profile
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default CreateSpark;
