package com.backend.nutt.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@AllArgsConstructor
public class IntakeFormRequest {

    @NotNull
    @Schema(description = "식사시간", allowableValues = {"BREAKFAST, LUNCH, DINNER, SNACK"})
    private String intakeTitle;

    @NotNull
    @Schema(description = "음식이름", example = "계란찜")
    private String foodName;

    @NotNull
    @Schema(description = "섭취칼로리", example = "120")
    private double intakeKcal;

    @NotNull
    @Schema(description = "섭취탄수화물", example = "120")
    private double intakeCarbohydrate;

    @NotNull
    @Schema(description = "섭취지방", example = "50")
    private double intakeFat;

    @NotNull
    @Schema(description = "섭취단백질", example = "60")
    private double intakeProtein;

    @NotNull
    @Schema(description = "Base64 Encode Image")
    private String image;

    @JsonFormat(pattern = "yyyy-dd-MM")
    private String intakeDate;

    @JsonFormat(pattern = "hh:mm")
    private String intakeTime;

}
