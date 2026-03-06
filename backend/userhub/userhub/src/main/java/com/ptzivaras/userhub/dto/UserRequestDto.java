package com.ptzivaras.userhub.dto;

import com.ptzivaras.userhub.entity.Gender;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public class UserRequestDto {
    @NotBlank(message = "Name is mandatory")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;

    @NotBlank(message = "Surname is mandatory")
    @Size(max = 100, message = "Surname must not exceed 100 characters")
    private String surname;

    @NotNull(message = "Gender is mandatory")
    private Gender gender;

    @NotNull(message = "Birthdate is mandatory")
    @Past(message = "Birthdate must be in the past")
    private LocalDate birthdate;

    @Valid
    private List<AddressRequestDto> addresses;

    public UserRequestDto() {}

    public UserRequestDto(String name, String surname, Gender gender, LocalDate birthdate, List<AddressRequestDto> addresses) {
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.birthdate = birthdate;
        this.addresses = addresses;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSurname() { return surname; }
    public void setSurname(String surname) { this.surname = surname; }

    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }

    public LocalDate getBirthdate() { return birthdate; }
    public void setBirthdate(LocalDate birthdate) { this.birthdate = birthdate; }

    public List<AddressRequestDto> getAddresses() { return addresses; }
    public void setAddresses(List<AddressRequestDto> addresses) { this.addresses = addresses; }
}
