package insa.rennes.web2;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class GameService {
    
    private final GameRepository repo;

    @Autowired
    public GameService(GameRepository repo) {
        this.repo = repo;
        //initializeGrids();
    }

    @PostConstruct
    public void initializeGrids() {
        // 0 : Angular | 1 : Gitlab | 2 : Java | 3 : npm | 4 : Spring | 5 : TypeScript
        List<Integer> board1 = List.of(0, 1, 2, 3, 4, 5, 0, 4, 5, 3, -1, 3, 5, 0, 2, 1);
        List<List<Integer>> patterns1 = List.of(
            Arrays.asList(0, 5),
            Arrays.asList(3, 3)
            );
        Grid grid1 = new Grid(board1, patterns1);

        List<Integer> board2 = List.of(2, 1, 0, 5, 5, 4, -1, 4, 3, 0, 3, 3, 2, 1, 5, 0);
        List<List<Integer>>  patterns2 = List.of(
            Arrays.asList(0, 3)
            );
        Grid grid2 = new Grid(board2, patterns2);

        repo.save(grid1);
        repo.save(grid2);
    }

    public Optional<GridDTO> getGrid(Long id) {
        if(repo.existsById(id)) {
            Grid g = repo.findById(id).get();
            GridDTO grid = new GridDTO(g);
            return Optional.of(grid);
        }
        return Optional.empty();
    }

    public Optional<List<String>> getAllNames() {
        List<String> names = new ArrayList<>();
        repo.findAll().forEach(grid -> names.add(grid.getName()));
        return Optional.of(names);
    }

    public boolean patchScoreboard(ScoreDTO dto) {
        Long gridId = (long) dto.getId();
        Optional<Grid> gridOpt = repo.findById(gridId);
        if (gridOpt.isPresent()) {
            Grid grid = gridOpt.get();
            grid.setScore(dto.getPlayerName(), dto.getScore());
            repo.save(grid);
            return true;
        }
        return false;
    }

    public Optional<Map<String, Integer>> getScoreboard(Long id) {
        return repo.findById(id).map(Grid::getScoreboard);
    }
}
