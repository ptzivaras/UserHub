package com.ptzivaras.userhub.dto;

import com.ptzivaras.userhub.entity.Gender;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class UserResponseDto {
    private Long id;
    private String name;
    private String surname;
    private Gender gender;
    private LocalDate birthdate;
    private LocalDateTime createdAt;
    private List<AddressResponseDto> addresses;

    public UserResponseDto() {}

    public UserResponseDto(Long id, String name, String surname, Gender gender, LocalDate birthdate, LocalDateTime createdAt, List<AddressResponseDto> addresses) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.birthdate = birthdate;
        this.createdAt = createdAt;
        this.addresses = addresses;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSurname() { return surname; }
    public void setSurname(String surname) { this.surname = surname; }

    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }

    public LocalDate getBirthdate() { return birthdate; }
    public void setBirthdate(LocalDate birthdate) { this.birthdate = birthdate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<AddressResponseDto> getAddresses() { return addresses; }
    public void setAddresses(List<AddressResponseDto> addresses) { this.addresses = addresses; }
}
