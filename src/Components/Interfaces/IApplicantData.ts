import { UUID } from "crypto";
import IAddress from "./IAddress";

export default interface IApplicantData {
  applicantData: {
    firstName: string;
    middleName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    passportNumber: string;
    issuedDate: Date;
    passportExpiryDate: Date;
    placeOfBirth: string;
    amharicFullName: string;
    arabicFullName: string;
    complexion: string;
    numberOfChildren: Number;
    motherName: string;
    previousNationality: string;
    height: Number;
    weight: Number;
    contractPeriod: Number;
    amharicJobTitle: string;
    remark: string;
    issuingCountryId: UUID;
    currentNationalityId: UUID;
    passportIssuedPlaceId: UUID;
    maritalStatusId: UUID;
    healthId: UUID;
    religionId: UUID;
    jobtitleId: UUID;
    experienceId: UUID;
    languageId: UUID;
    salaryId: UUID;
    desiredCountryId: UUID;
    brokerNameId: UUID;
    branchId: UUID;
    partnerId: UUID;
    skill: {
      languageSkills: [
        {
          canWrite: true;
          canRead: true;
          canSpeak: true;
          canListen: true;
          proficiency: string;
          languageId: UUID;
        }
      ];
      skills: [UUID];
    };
    applicantExperience: {
      experiences: [
        {
          periodLength: Number;
          position: string;
          countryId: UUID;
        }
      ];
    };
    education: {
      yearCompleted: Number;
      fieldOfStudy: string;
      professionalSkill: string;
      qualificationTypes: [UUID];
      levelofQualifications: [UUID];
      awards: [UUID];
    };
    bankAccount: {
      bankName: string;
      accountNumber: Number;
      branchName: string;
      swiftCode: string;
    };
    emergencyContact: {
      nameOfContactPerson: string;
      arabicName: string;
      birthDate: Date;
      gender: string;
      relationshipId: UUID;
      address: IAddress;
    };
    witness: {
      representative: {
        fullName: string;
        city: string;
        zone: string;
        woreda: string;
        kebele: string;
        phoneNumber: string;
        houseNumber: string;
      };
      witnesses: [
        {
          fullName: string;
          address: string;
          phoneNumber: string;
        }
      ];
    };
    beneficiary: {
      beneficiaries: [
        {
          fullName: string;
          region: string;
          zone: string;
          woreda: string;
          rate: Number;
          relationshipId: UUID;
        }
      ];
    };
    attachment: {
      orderId: UUID;
      attachmentFiles: [
        {
          attachmentFile: string;
          attachmentId: UUID;
        }
      ];
    };
    address: IAddress;
  };
}
