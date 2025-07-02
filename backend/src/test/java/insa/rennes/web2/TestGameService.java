package insa.rennes.web2;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
public class TestGameService {
    // Cette classe est destinée aux tests sur le GameService
    
    @MockBean
    private GameRepository repository;
    
    @Autowired
    private GameService gameService;

    Grid grid1;
    Grid grid2;

    @BeforeEach
    public void setUp() {
        List<Integer> board1 = List.of(0, 1, 2, 3, 4, 5, 0, 4, 5, 3, -1, 3, 5, 0, 2, 1);
        List<List<Integer>> patterns1 = List.of(
            Arrays.asList(0, 5),
            Arrays.asList(3, 3)
            );
        grid1 = new Grid(board1, patterns1);

        List<Integer> board2 = List.of(2, 1, 0, 5, 5, 4, -1, 4, 3, 0, 3, 3, 2, 1, 5, 0);
        List<List<Integer>>  patterns2 = List.of(
            Arrays.asList(0, 3)
            );
        grid2 = new Grid(board2, patterns2);
    }

    @Test
    public void initializeGridsCallsSaveTwice() {
        gameService.initializeGrids();
    
        // Vérifier que repo.save a été appelé deux fois
        Mockito.verify(repository, Mockito.times(2)).save(Mockito.any(Grid.class));
    }
    
    @Test
    public void getGridReturnsGridDTOIfExists() {
        Grid grid = new Grid(List.of(0, 1, 2, 3), List.of(Arrays.asList(0, 1)));
        grid.setId(1);
        Mockito.when(repository.existsById(1L)).thenReturn(true);
        Mockito.when(repository.findById(1L)).thenReturn(Optional.of(grid));

        Optional<GridDTO> resultat = gameService.getGrid(1L);

        // Vérifier que le résultat est présent et correspond au GridDTO attendu
        assertTrue(resultat.isPresent());
    }

    @Test
    public void getAllNamesReturnsListOfGridNames() {
        Grid grid1 = new Grid(List.of(0, 1, 2, 3), List.of(Arrays.asList(0, 1)));
        Grid grid2 = new Grid(List.of(4, 5, 6, 7), List.of(Arrays.asList(2, 3)));

        Mockito.when(repository.findAll()).thenReturn(List.of(grid1, grid2));

        Optional<List<String>> resultat = gameService.getAllNames();

        // Assert: Vérifier que la liste retournée contient les noms des grilles
        assertTrue(resultat.isPresent());
        assertEquals(List.of("Board 0", "Board 0"), resultat.get());
    }

    @Test
    public void patchScoreboardUpdatesScore() {
        int score = 100;
        int idGrid = 1;
        String playerName = "Alice";
        ScoreDTO scoreDTO = new ScoreDTO(score, idGrid, playerName);
    
        Grid grid = new Grid(List.of(0, 1, 2, 3), List.of(Arrays.asList(0, 1)));
        grid.setId(idGrid);
        Mockito.when(repository.findById((long) idGrid)).thenReturn(Optional.of(grid));
    
        boolean result = gameService.patchScoreboard(scoreDTO);
    
        assertTrue(result);
        Mockito.verify(repository, Mockito.times(1)).save(grid);
        assertEquals(score, grid.getScoreboard().get(playerName));
    }

    @Test
    public void getScoreboardReturnsScoreboardIfGridExists() {
        Grid grid = new Grid(List.of(0, 1, 2, 3), List.of(Arrays.asList(0, 1)));
        grid.setScore("Player 1", 100);
        Mockito.when(repository.findById(1L)).thenReturn(Optional.of(grid));

        Optional<Map<String, Integer>> result = gameService.getScoreboard(1L);

        // Vérifier que le Scoreboard retourné correspond à celui de la grille
        assertTrue(result.isPresent());
        assertEquals(Map.of("Player 1", 100), result.get());
    }
}
