import csv

from infodistrictes.frontend import models


def import_expenses():
    with open('deltebre/frontend/scripts/Despeses_2017.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            models.Expense.objects.create(
                concept=row['Concepte'],
                chapter=row['Capítol'],
                budgeted=row['Pressupostat'],
                real=row['Real'],
                difference=row['Diferència'],
                color=row['Color'],
                year=2017
            )


def import_gender_age():
    with open('deltebre/frontend/scripts/edat_sexe_tl.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            models.GenderAge.objects.create(
                count=row['Recompte'],
                age=row['Edats'],
                genre=row['Gènere'],
                color=row['Color'],
                year=row['Any'],
            )


def import_income():
    with open('deltebre/frontend/scripts/Ingressos_2017.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            models.Income.objects.create(
                concept=row['Concepte'],
                chapter=row['Capítol'],
                budget=row['Pressupostat'],
                real=row['Real'],
                difference=row['Diferència'],
                color=row['Color'],
                year=2017,
            )


def import_nationality():
    with open('deltebre/frontend/scripts/Nacionalitats_barres_2017.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            models.Nationality.objects.create(
                name=row['Nacionalitat'],
                total=row['Total'],
                year=2017,
                color=row['color'],
            )


def import_turistic_service():
    with open('deltebre/frontend/scripts/Serveis_turistics.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            models.TuristicService.objects.create(
                service=row['Servei'],
                total=row['Total'],
                color=row['Color'],
                year=2017,
            )


def import_election(filename):
    elections_name = filename.split('.')[0].replace('_', ' ')
    year = int('20{}'.format(elections_name[-2:]))
    election, _ = models.Election.objects.get_or_create(name=elections_name, year=year)

    with open('deltebre/frontend/scripts/{}'.format(filename)) as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            models.ElectionVote.objects.create(
                acronym=row['Acrònim'],
                party=row['Partit'],
                votes=row['Vots'],
                percentage=row['Percentatge'][:-1],
                color=row['color'],
                image=row['image'],
                election=election,
            )


def import_elections():
    import_election('Eleccions_A21D17.csv')
    import_election('Eleccions_A27S15.csv')
    import_election('Eleccions_G20D15.csv')
    import_election('Eleccions_G26J16.csv')


def import_visits():
    with open('deltebre/frontend/scripts/Visitants_ecomuseu.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            models.EcomuseumVisits.objects.create(
                month=row['Mes'],
                year=row['Any'],
                visits=row['Visitants'],
                color=row['Color']
            )


def import_accommodation():
    with open('deltebre/frontend/scripts/allotjaments_tipus.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            models.AccommodationType.objects.create(
                kind=row['Tipus'],
                capacity=row['Capacitat'],
                number=row['Número'],
                color=row['color']
            )


def import_minors():
    with open('deltebre/frontend/scripts/Menors.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            models.Minors.objects.create(
                trimester=row['Trimestre'],
                number=row['Número'],
                amount=row['Import'],
                color=row['color'],
                year=row['Any'],
            )


def import_unemployment():
    with open('deltebre/frontend/scripts/Atur.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            models.Unemployment.objects.create(
                year=row['Any'],
                unemployment=float(row['Atur']),
                gender=row['Sexe'],
                color=row['Color']
            )


def import_contracts():
    with open('deltebre/frontend/scripts/Contractes_oberts.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            models.OpenContract.objects.create(
                description=row['Descripció'],
                amount=float(row['Import']),
                company=row['Empresa'],
                color=row['color'],
                year=row['Any']
            )


def import_all():
    import_expenses()
    import_gender_age()
    import_elections()
    import_income()
    import_nationality()
    import_turistic_service()
    import_visits()
    import_accommodation()
    import_minors()
    import_unemployment()
    import_contracts()
