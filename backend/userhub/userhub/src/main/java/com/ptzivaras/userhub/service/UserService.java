package com.ptzivaras.userhub.service;

import com.ptzivaras.userhub.dto.UserRequestDto;
import com.ptzivaras.userhub.dto.UserResponseDto;
import com.ptzivaras.userhub.dto.UserSummaryDto;

import java.util.List;

public interface UserService {
    UserResponseDto createUser(UserRequestDto request);
    List<UserSummaryDto> getAllUsers();
    UserResponseDto getUserById(Long id);
    void deleteUser(Long id);
}
