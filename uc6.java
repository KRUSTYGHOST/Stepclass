public class uc6 {
    public static void main(String[] args) {
        String[] lines = {
            build0(),
            build1(),
            build2(),
            build3(),
            build4(),
            build5()
        };

        for (String line : lines) {
            System.out.println(line);
        }
    }

    private static String build0() {
        return String.join(" ", "   ***   ", "      ***      ", "   ******    ");
    }

    private static String build1() {
        return String.join(" ", " **   ** ", "    **   **    ", "   **   **   ");
    }

    private static String build2() {
        return String.join(" ", " **   ** ", "    **   **    ", "   **    **  ");
    }
    private static String build3() {
        return String.join(" ", " **   ** ", "    **   **    ", "   **  **    ");
    }
    private static String build4() {
        return String.join(" ", " **   ** ", "    **   **    ", "   **        ");
    }
    private static String build5() {
        return String.join(" ", "   ***   ", "      ***      ", "   **        ");
    }
}   