package com.ptzivaras.userhub.service.impl;

import com.ptzivaras.userhub.dto.*;
import com.ptzivaras.userhub.entity.Address;
import com.ptzivaras.userhub.entity.User;
import com.ptzivaras.userhub.exception.ResourceNotFoundException;
import com.ptzivaras.userhub.repository.UserRepository;
import com.ptzivaras.userhub.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserResponseDto createUser(UserRequestDto request) {
        User user = new User();
        user.setName(request.getName());
        user.setSurname(request.getSurname());
        user.setGender(request.getGender());
        user.setBirthdate(request.getBirthdate());

        if (request.getAddresses() != null) {
            for (AddressRequestDto addrDto : request.getAddresses()) {
                Address address = new Address();
                address.setAddressType(addrDto.getAddressType());
                address.setAddressText(addrDto.getAddressText());
                address.setUser(user);
                user.getAddresses().add(address);
            }
        }

        User saved = userRepository.save(user);
        return toResponseDto(saved);
    }

    @Override
    public List<UserSummaryDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserSummaryDto> result = new ArrayList<>();
        for (User u : users) {
            result.add(new UserSummaryDto(u.getId(), u.getName(), u.getSurname()));
        }
        return result;
    }

    @Override
    public UserResponseDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return toResponseDto(user);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    private UserResponseDto toResponseDto(User user) {
        UserResponseDto response = new UserResponseDto();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setSurname(user.getSurname());
        response.setGender(user.getGender());
        response.setBirthdate(user.getBirthdate());
        response.setCreatedAt(user.getCreatedAt());

        List<AddressResponseDto> addressDtos = new ArrayList<>();
        if (user.getAddresses() != null) {
            for (Address a : user.getAddresses()) {
                AddressResponseDto addrDto = new AddressResponseDto();
                addrDto.setId(a.getId());
                addrDto.setAddressType(a.getAddressType());
                addrDto.setAddressText(a.getAddressText());
                addrDto.setCreatedAt(a.getCreatedAt());
                addressDtos.add(addrDto);
            }
        }
        response.setAddresses(addressDtos);
        return response;
    }
}
