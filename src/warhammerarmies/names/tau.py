# Names from https://www.fantasynamegenerators.com/warhammer-40k-tau-names.php
from random import randint

part1 = ["Al", "Ar", "Ash", "Bant", "Bra", "Bun", "Dia", "Dor", "Dra", "Fio",
         "Fir", "Fral", "Gir", "Gra", "Gras", "Har", "Hia", "Hova", "Inio",
         "Ir", "Irah", "Jax", "Jila", "Jol", "Kes", "Ko", "Krin", "Man",
         "Mira", "Mon", "Nar", "Nase", "Nori", "Ora", "Orna", "Oxa", "Pax",
         "Pira", "Prin", "Resh", "Ria", "Ril", "Shase", "Shi", "Sio", "Tor",
         "Tsu", "Tsua", "Var", "Vra", "Vura", "Wran", "Wua", "Wura", "Xira",
         "Xo", "Xral"]
part2 = ["'are", "'ath", "'ax", "'bash", "'bin", "'bur", "'dax", "'dis",
         "'dras", "'elo", "'en", "'erk", "'fa", "'fel", "'fin", "'ga", "'gos",
         "'gri", "'ha", "'hin", "'hos", "'jash", "'jin", "'jor", "'kir", "'ko",
         "'kran", "'la", "'las", "'len", "'me", "'min", "'mor", "'na", "'nera",
         "'nesh", "'or", "'os", "'osh", "'par", "'pin", "'pras", "'ra", "'rak",
         "'rax", "'sha", "'shash", "'som", "'taga", "'ter", "'tin", "'un",
         "'ur", "'us", "'vash", "'vax", "'vren", "'wer", "'werd", "'wra",
         "'xan", "'xil", "'xo", "'yr", "ah", "al", "aln", "an", "ara", "arn",
         "ash", "ax", "eh", "el", "en", "er", "erra", "es", "esh", "eth", "ina",
         "ir", "ira", "irn", "irr", "ish", "ith", "ix", "o", "oh", "ol", "om",
         "on", "or", "ot", "oth", "u", "ug", "un", "ur", "urn", "us", "uth",
         "ux"]


def gen_name():
    return part1[randint(0, len(part1)-1)] + part2[randint(0, len(part2)-1)]
