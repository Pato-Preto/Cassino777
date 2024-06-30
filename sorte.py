import random
import json

def gerar_resultados():
    frutas = ['🍒', '🍋', '🍉', '🍇', '🍓']
    resultados = []

    for _ in range(9):
        resultados.append(random.choice(frutas))

    with open('resultados.json', 'w') as f:
        json.dump(resultados, f)

# Gerar resultados aleatórios ao iniciar o jogo
gerar_resultados()
