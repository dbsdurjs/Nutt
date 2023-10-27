package com.backend.nutt.common;


import com.backend.nutt.exception.unavailable.TokenExpiredException;
import com.backend.nutt.service.TokenService;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;
import java.util.Enumeration;

@RequiredArgsConstructor
@Component
public class TokenFilter extends GenericFilterBean {
    private final TokenService tokenService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        Enumeration<String> headers = httpServletRequest.getHeaders("Authorization");
        String accessToken = null;
        while (headers.hasMoreElements()) {
            String value = headers.nextElement();
            if (value.startsWith("Bearer")) {
                accessToken = value.substring("Bearer".length()).trim();
            }
        }


        try {
            if (accessToken != null && tokenService.checkToken(accessToken) && tokenService.findAccessToken(accessToken) == null) {
                Authentication authentication = tokenService.getAuthentication(accessToken);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (TokenExpiredException e) {
            throw new RuntimeException(e);
        }
        chain.doFilter(request, response);
    }
}
