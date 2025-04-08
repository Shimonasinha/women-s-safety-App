import tkinter as tk
from tkinter import messagebox, simpledialog
import pandas as pd
import random

class GKQuiz:
    def __init__(self, root):
        self.root = root
        self.root.title("GK Quiz")
self.root.geometry("600x400")

        self.questions = {
            "Easy": [
                {"question": "What is the capital of France?", "options": ["Madrid", "Berlin", "Paris", "Rome"], "answer": "Paris"},
                {"question": "What is the largest planet in our solar system?", "options": ["Earth", "Jupiter", "Mars", "Saturn"], "answer": "Jupiter"},
                {"question": "Which programming language is this quiz written in?", "options": ["Java", "C++", "Python", "JavaScript"], "answer": "Python"},
            ],
            "Medium": [
                {"question": "What is the currency of Japan?", "options": ["Won", "Yuan", "Yen", "Ringgit"], "answer": "Yen"},
                {"question": "Who wrote 'Romeo and Juliet'?", "options": ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], "answer": "William Shakespeare"}
            ],
            "Hard": [
                {"question": "What is the square root of 144?", "options": ["10", "12", "14", "16"], "answer": "12"},
                {"question": "Which chemical element has the symbol 'O'?", "options": ["Oxygen", "Gold", "Iron", "Lead"], "answer": "Oxygen"}
            ]
        }

        self.current_difficulty = ""
        self.question_index = 0
        self.score = 0
        self.current_user = None

        self.create_start_page()

    def create_start_page(self):
        start_page = tk.Frame(self.root, bg="lightblue")
        start_page.pack(fill="both", expand=True)

        difficulty_label = tk.Label(start_page, text="Select Difficulty:", font=("Arial", 16), bg="lightblue")
        difficulty_label.pack(pady=20)

        easy_button = tk.Button(start_page, text="Easy", command=lambda: self.start_quiz("Easy"), bg="green", fg="white")
        easy_button.pack(pady=10)

        medium_button = tk.Button(start_page, text="Medium", command=lambda: self.start_quiz("Medium"), bg="orange", fg="white")
        medium_button.pack(pady=10)

        hard_button = tk.Button(start_page, text="Hard", command=lambda: self.start_quiz("Hard"), bg="red", fg="white")
        hard_button.pack(pady=10)

    def start_quiz(self, difficulty):
        self.current_difficulty = difficulty
        self.question_index = 0
        self.score = 0

        start_page = self.root.winfo_children()[0]
        start_page.pack_forget()

        if not self.current_user:
            self.login_user()
        else:
            self.show_question()

    def login_user(self):
        login_page = tk.Frame(self.root, bg="lightcoral")
        login_page.pack(fill="both", expand=True)

        username_label = tk.Label(login_page, text="Username:", bg="lightcoral")
        username_label.pack(pady=10)

        username_entry = tk.Entry(login_page)
        username_entry.pack(pady=10)

        password_label = tk.Label(login_page, text="Password:", bg="lightcoral")
        password_label.pack(pady=10)

        password_entry = tk.Entry(login_page, show="*")
        password_entry.pack(pady=10)

        login_button = tk.Button(login_page, text="Login", command=lambda: self.validate_login(username_entry.get(), password_entry.get()), bg="green", fg="white")
        login_button.pack(pady=10)

    def validate_login(self, username, password):
        users_df = pd.read_excel("registered_users.xlsx")
        if username in users_df['Username'].values and password == users_df.loc[users_df['Username'] == username, 'Password'].values[0]:
            self.current_user = username
            self.root.winfo_children()[1].pack_forget()  # Hide login page
            self.show_question()
        else:
            messagebox.showinfo("Error", "Invalid username or password. Please try again.")

    def show_question(self):
        if self.question_index < len(self.questions[self.current_difficulty]):
            question_data = self.questions[self.current_difficulty][self.question_index]
            question_text = question_data["question"]
            options = question_data["options"]

            question_page = tk.Frame(self.root, bg="lightyellow")
            question_page.pack(fill="both", expand=True)

            question_label = tk.Label(question_page, text=question_text, font=("Arial", 14), pady=10, bg="lightyellow")
            question_label.pack()

            var = tk.StringVar()
            for option in options:
                tk.Radiobutton(question_page, text=option, variable=var, value=option, font=("Arial", 12), bg="lightyellow").pack()

            submit_button = tk.Button(question_page, text="Submit", command=lambda: self.check_answer(var), bg="blue", fg="white")
            submit_button.pack(pady=10)
        else:
            self.show_result_page()

    def check_answer(self, var):
        user_answer = var.get()
        correct_answer = self.questions[self.current_difficulty][self.question_index]["answer"]

        if user_answer == correct_answer:
            self.score += 1

        question_page = self.root.winfo_children()[1]
        question_page.pack_forget()

        self.question_index += 1
        self.show_question()

    def show_result_page(self):
        result_page = tk.Frame(self.root)
        result_page.pack(fill="both", expand=True)

        score_label = tk.Label(result_page, text=f"Your score: {self.score}/{len(self.questions[self.current_difficulty])}", font=("Arial", 16), pady=20)
        score_label.pack()

        save_button = tk.Button(result_page, text="Save Result", command=self.save_result, bg="green", fg="white")
        save_button.pack(pady=10)

        restart_button = tk.Button(result_page, text="Restart Quiz", command=self.create_start_page, bg="blue", fg="white")
        restart_button.pack(pady=10)

    def save_result(self):
        if not self.current_user:
            self.current_user = self.ask_username()
            if not self.current_user:
                return

        result_df = pd.DataFrame({
            'Username': [self.current_user],
            'Difficulty': [self.current_difficulty],
            'Score': [f"{self.score}/{len(self.questions[self.current_difficulty])}"]
        })

        try:
            existing_df = pd.read_excel("quiz_results.xlsx")
            updated_df = pd.concat([existing_df, result_df], ignore_index=True)
            updated_df.to_excel("quiz_results.xlsx", index=False)
        except FileNotFoundError:
            result_df.to_excel("quiz_results.xlsx", index=False)

        messagebox.showinfo("Success", "Result saved successfully!")

    def ask_username(self):
        username = simpledialog.askstring("Input", "Enter your username:")
        return username

if __name__ == "__main__":
    root = tk.Tk()
    gk_quiz = GKQuiz(root)
    root.mainloop()
