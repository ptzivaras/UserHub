package com.ptzivaras.userhub.service;

import com.ptzivaras.userhub.dto.UserRequestDto;
import com.ptzivaras.userhub.dto.UserResponseDto;
import com.ptzivaras.userhub.dto.UserSummaryDto;
import com.ptzivaras.userhub.entity.Gender;
import com.ptzivaras.userhub.entity.User;
import com.ptzivaras.userhub.exception.ResourceNotFoundException;
import com.ptzivaras.userhub.repository.UserRepository;
import com.ptzivaras.userhub.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setName("John");
        testUser.setSurname("Doe");
        testUser.setGender(Gender.M);
        testUser.setBirthdate(LocalDate.of(1990, 5, 15));
        testUser.setCreatedAt(LocalDateTime.now());
        testUser.setAddresses(new ArrayList<>());
    }

    @Test
    void createUser_shouldReturnCreatedUser() {
        UserRequestDto request = new UserRequestDto("John", "Doe", Gender.M, LocalDate.of(1990, 5, 15), null);
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        UserResponseDto result = userService.createUser(request);

        assertNotNull(result);
        assertEquals("John", result.getName());
        assertEquals("Doe", result.getSurname());
        assertEquals(Gender.M, result.getGender());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void getAllUsers_shouldReturnUserSummaryList() {
        when(userRepository.findAll()).thenReturn(List.of(testUser));

        List<UserSummaryDto> result = userService.getAllUsers();

        assertEquals(1, result.size());
        assertEquals("John", result.get(0).getName());
        assertEquals("Doe", result.get(0).getSurname());
    }

    @Test
    void getAllUsers_shouldReturnEmptyListWhenNoUsers() {
        when(userRepository.findAll()).thenReturn(List.of());

        List<UserSummaryDto> result = userService.getAllUsers();

        assertTrue(result.isEmpty());
    }

    @Test
    void getUserById_shouldReturnUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

        UserResponseDto result = userService.getUserById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("John", result.getName());
    }

    @Test
    void getUserById_shouldThrowWhenNotFound() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> userService.getUserById(99L));
    }

    @Test
    void deleteUser_shouldDeleteWhenUserExists() {
        when(userRepository.existsById(1L)).thenReturn(true);

        userService.deleteUser(1L);

        verify(userRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteUser_shouldThrowWhenUserNotFound() {
        when(userRepository.existsById(99L)).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> userService.deleteUser(99L));
        verify(userRepository, never()).deleteById(any());
    }
}
