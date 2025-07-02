package insa.rennes.web2;

/* This DTO is used to update the scoreboard of a Grid in the back-end */
public class ScoreDTO {
    private int score;
    private int idGrid;
    private String playerName;

    public ScoreDTO(int score, int idGrid, String playerName) {
        this.score = score;
        this.idGrid = idGrid;
        this.playerName = playerName;
    }

    public int getScore() {
        return this.score;
    }

    public int getId() {
        return this.idGrid;
    }

    public String getPlayerName() {
        return this.playerName;
    }
}
