package insa.rennes.web2;

import java.util.List;

public class GridDTO {
    private int id;
    private List<Integer> board;
    private List<List<Integer>> pattern;

    public GridDTO(Grid g) {
        id = g.getId();
        board = g.getBoard();
        pattern = g.getPattern();
    }

    public GridDTO() {
        
    }

    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public List<Integer> getBoard() {
        return board;
    }
    
    public void setBoard(List<Integer> board) {
        this.board = board;
    }
    
    public List<List<Integer>> getPattern() {
        return pattern;
    }
    
    public void setPattern(List<List<Integer>> pattern) {
        this.pattern = pattern;
    }    
}

