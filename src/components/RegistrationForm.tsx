import React from 'react';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import RegistrationFormPersonalInformation from './registrationFormPortions/RegistrationFormPersonalInformation';
import RegistrationFormEducation from './registrationFormPortions/RegistrationFormEducation';
import RegistrationFormRegistrationType from './registrationFormPortions/RegistrationFormRegistrationType';
import { Registration } from '../model/registration';
import { useAtom } from 'jotai';
import {
  firstNameAtom,
  lastNameAtom,
  emailAtom,
  tShirtSizeAtom,
  programAtom,
  collegeNameAtom,
  registrationTypeAtom,
  teamNameAtom,
  challengeNameAtom,
  isTeamCompleteAtom,
  semesterAtom,
  graduationYearAtom,
  senecaStatusAtom,
  pastHackathonParticipationAtom,
  finaleJoinPreferenceAtom,
  cellPhoneAtom,
} from '../atoms/FormAtoms';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
  // States for form fields
  const [firstName] = useAtom(firstNameAtom);
  const [lastName] = useAtom(lastNameAtom);
  const [email] = useAtom(emailAtom);
  const [tShirtSize] = useAtom(tShirtSizeAtom);
  const [program] = useAtom(programAtom);
  const [collegeName] = useAtom(collegeNameAtom);
  const [registrationType] = useAtom(registrationTypeAtom);
  const [teamName] = useAtom(teamNameAtom);
  const [challengeName] = useAtom(challengeNameAtom);
  const [isTeamComplete] = useAtom(isTeamCompleteAtom);
  const [semester] = useAtom(semesterAtom);
  const [graduationYear] = useAtom(graduationYearAtom);
  const [senecaStatus] = useAtom(senecaStatusAtom);
  const [cellPhone] = useAtom(cellPhoneAtom);
  const [pastHackathonParticipation] = useAtom(pastHackathonParticipationAtom);
  const [finaleJoinPreference] = useAtom(finaleJoinPreferenceAtom);

  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const navigate = useNavigate();

  // Functionalities

  const isFormFilled = () => {
    if (
      firstName &&
      lastName &&
      email &&
      tShirtSize &&
      program &&
      collegeName &&
      registrationType &&
      challengeName &&
      semester &&
      graduationYear &&
      pastHackathonParticipation &&
      finaleJoinPreference &&
      cellPhone
    ) {
      if (registrationType === 'Team' && teamName && isTeamComplete && senecaStatus) {
        return true;
      } else if (registrationType === 'Individual') {
        return true;
      }
    }
    return false;
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const participant = new Registration({
      firstName: firstName,
      lastName: lastName,
      email: email,
      tShirtSize: tShirtSize,
      program: program,
      collegeName: collegeName,
      registrationType: registrationType,
      teamName: teamName,
      challengeName: challengeName,
      isTeamCompleted: isTeamComplete,
      semester: semester,
      graduationYear: graduationYear,
      senecaStudentStatus: senecaStatus,
      pastHackathonParticipation: pastHackathonParticipation,
      finaleJoinPreference: finaleJoinPreference,
      cellPhone: cellPhone,
    });
    const userId = await participant.submitForm();
    navigate(`/success/${userId}`);
    setIsSubmitted(true);
  };

  return (
    <Container onSubmit={(ev) => onSubmit(ev)} component="form" maxWidth="md" className="mb-5">
      <Typography variant="h1">Registration Form</Typography>
      {/* Personal Information */}
      <RegistrationFormPersonalInformation />

      {/* Education */}
      <RegistrationFormEducation />

      <RegistrationFormRegistrationType />

      {/* Button set */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <Button
          variant="contained"
          type="submit"
          sx={{ width: '30%' }}
          disabled={!isFormFilled() || isSubmitted}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default RegistrationForm;