import ply.lex as lex  
import ply.yacc as yacc  

# Token definitions  
tokens = (  
    'ID', 'NUMBER', 'LBRACE', 'RBRACE', 'LPAREN', 'RPAREN', 'SEMICOLON',  
    'IF', 'ELSE', 'SWITCH', 'CASE', 'DEFAULT', 'COLON', 'RETURN', 'INT'  
)  

# Reserved words mapping  
reserved = {  
    'if': 'IF',  
    'else': 'ELSE',  
    'switch': 'SWITCH',  
    'case': 'CASE',  
    'default': 'DEFAULT',  
    'return': 'RETURN',  
    'int': 'INT'  
}  

# Token regex patterns  
t_LBRACE    = r'\{'  
t_RBRACE    = r'\}'  
t_LPAREN    = r'\('  
t_RPAREN    = r'\)'  
t_SEMICOLON = r';'  
t_COLON     = r':'  
t_ignore    = ' \t'  # Ignore spaces and tabs  

# Token for identifiers and reserved words  
def t_ID(t):  
    r'[a-zA-Z_][a-zA-Z0-9_]*'  
    t.type = reserved.get(t.value, 'ID')  # Check for reserved words  
    return t  

def t_NUMBER(t):  
    r'\d+'  
    t.value = int(t.value)  
    return t  

# Handle new lines  
def t_newline(t):  
    r'\n+'  
    t.lexer.lineno += len(t.value)  

# Error for illegal characters  
def t_error(t):  
    print(f"Illegal character '{t.value[0]}' at line {t.lexer.lineno}")  
    t.lexer.skip(1)  

# Build the lexer  
lexer = lex.lex()  

# List to store constructs with code  
constructs = []  

# Parsing rules  
def p_program(p):  
    '''program : function_definition'''  
    pass  

def p_function_definition(p):  
    '''function_definition : INT ID LPAREN RPAREN LBRACE statements RBRACE'''  
    constructs.append(("Function Definition", f"{p[1]} {p[2]}() {{ ... }}"))  

def p_statements(p):  
    '''statements : statements statement  
                  | statement'''  
    pass  

def p_statement(p):  
    '''statement : if_statement  
                 | if_else_statement  
                 | switch_statement  
                 | return_statement'''  
    pass  

def p_if_statement(p):  
    '''if_statement : IF LPAREN expression RPAREN LBRACE statements RBRACE'''  
    constructs.append(("If Statement", f"if ({p[3]}) {{ ... }}"))  

def p_if_else_statement(p):  
    '''if_else_statement : IF LPAREN expression RPAREN LBRACE statements RBRACE ELSE LBRACE statements RBRACE'''  
    constructs.append(("If-Else Statement", f"if ({p[3]}) {{ ... }} else {{ ... }}"))  

def p_switch_statement(p):  
    '''switch_statement : SWITCH LPAREN expression RPAREN LBRACE switch_cases default_case RBRACE'''  
    constructs.append(("Switch Statement", f"switch ({p[3]}) {{ ... }}"))  

def p_switch_cases(p):  
    '''switch_cases : switch_cases switch_case  
                    | switch_case  
                    | empty'''  
    pass  

def p_switch_case(p):  
    '''switch_case : CASE NUMBER COLON statements SEMICOLON'''  
    constructs.append(("Case", f"case {p[2]}: {{ ... }}"))  

def p_default_case(p):  
    '''default_case : DEFAULT COLON statements SEMICOLON  
                    | empty'''  
    if len(p) > 1:  
        constructs.append(("Default Case", "default: { ... }"))  

def p_return_statement(p):  
    '''return_statement : RETURN expression SEMICOLON'''  
    constructs.append(("Return Statement", f"return {p[2]};"))  

def p_expression(p):  
    '''expression : ID  
                  | NUMBER'''  
    p[0] = p[1]  # Set the value of the expression to be utilized   

def p_empty(p):  
    'empty :'  
    pass  

# Error rule for syntax errors  
def p_error(p):  
    if p:  
        print(f"Syntax error at '{p.value}' at line {p.lineno}")  
    else:  
        print("Syntax error at EOF")  

# Build the parser  
parser = yacc.yacc()  

# Function to parse code and display constructs  
def parse_code(input_code):  
    global constructs  
    constructs = []  # Reset constructs list  
    lexer.input(input_code)  # Initialize lexer with input code  
    parser.parse(input_code, lexer=lexer)  
    
    print("Parsed Constructs:")  
    for construct_name, code in constructs:  
        print(f"{construct_name}:")  
        print(code)  
        print("-" * 30)  

# Example code input  
user_code = """  
int func() {  
    if (x) {  
        return 0;  
    } else {  
        return 1;  
    }  
}  

switch (1) {  
    case 1:  
        return 0;  
    default:  
        return 1;  
}  
"""  

# Parse the user's code and display constructs  
parse_code(user_code)
