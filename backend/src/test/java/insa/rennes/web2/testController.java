package insa.rennes.web2;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
public class testController {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private GameService gameService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
void testGetGrid_Success() throws Exception {
    Long gridId = 1L;
    GridDTO mockGrid = new GridDTO();
    mockGrid.setId(1);
    mockGrid.setBoard(List.of(1, 2, 3, 4));
    mockGrid.setPattern(List.of(List.of(1, 2), List.of(3, 4)));

    Mockito.when(gameService.getGrid(gridId)).thenReturn(Optional.of(mockGrid));

    mvc.perform(get("/api/game/grid/{id}", gridId)
            .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(mockGrid.getId()))
        .andExpect(jsonPath("$.board").isArray())
        .andExpect(jsonPath("$.board[0]").value(1));
}


@Test
void testGetGrid_NotFound() throws Exception {
    when(gameService.getGrid(99L)).thenReturn(Optional.empty());

    mvc.perform(get("/api/game/grid/99")
            .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isBadRequest());
}

  @Test
    void testGetAllNames_Success() throws Exception {
        when(gameService.getAllNames()).thenReturn(Optional.of(List.of("Board 1", "Board 2")));

        mvc.perform(get("/api/game/grid/names"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.length()").value(2))
            .andExpect(jsonPath("$[0]").value("Board 1"))
            .andExpect(jsonPath("$[1]").value("Board 2"));
    }

    @Test
    void testPatchScoreboard_Success() throws Exception {

        ScoreDTO dto = new ScoreDTO(100, 1, "Player1");
        String json = objectMapper.writeValueAsString(dto);

        when(gameService.patchScoreboard(any(ScoreDTO.class))).thenReturn(true);

        mvc.perform(patch("/api/game/grid/scoreboard")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
            .andExpect(status().isOk());
    }

    @Test
    void testPatchScoreboard_Failure() throws Exception {
        ScoreDTO dto = new ScoreDTO(100, 99, "Player1");
        String json = objectMapper.writeValueAsString(dto);

        when(gameService.patchScoreboard(any(ScoreDTO.class))).thenReturn(false);

        mvc.perform(patch("/api/game/grid/scoreboard")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
            .andExpect(status().isBadRequest());
    }

    @Test
    void testGetScoreboard_Success() throws Exception {
        Map<String, Integer> mockScoreboard = Map.of("Player1", 100, "Player2", 50);

        when(gameService.getScoreboard(1L)).thenReturn(Optional.of(mockScoreboard));

        mvc.perform(get("/api/game/grid/1/scoreboard"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.Player1").value(100))
            .andExpect(jsonPath("$.Player2").value(50));
    }

    @Test
    void testGetScoreboard_NotFound() throws Exception {
        when(gameService.getScoreboard(99L)).thenReturn(Optional.empty());
    
        mvc.perform(get("/api/game/grid/99/scoreboard"))
            .andExpect(status().isBadRequest());
    }
}