// a function next_day() that accepts the addresses of the three integers that represent a date and changes their values to represent the next day
#include <iostream>
using namespace std;
void next_day(int* day, int* month, int* year) {
    // Days in each month
    int days_in_month[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

    // Check for leap year
    bool is_leap_year = (*year % 4 == 0 && *year % 100 != 0) || (*year % 400 == 0);
    if (is_leap_year) {
        days_in_month[1] = 29; // February has 29 days in a leap year
    }

    // Increment the day
    (*day)++;

    // Check if the day exceeds the number of days in the month
    if (*day > days_in_month[*month - 1]) {
        *day = 1; // Reset day to 1
        (*month)++; // Increment month

        // Check if the month exceeds December
        if (*month > 12) {
            *month = 1; // Reset month to January
            (*year)++; // Increment year
        }
    }
}
int main() {
    int day, month, year;
    cout << "Enter day, month, year: ";
    cin >> day >> month >> year;

    next_day(&day, &month, &year);

    cout << "Next day is: " << day << "/" << month << "/" << year << endl;
    return 0;
}