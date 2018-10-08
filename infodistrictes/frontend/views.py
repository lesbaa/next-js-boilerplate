import csv
import html
import json

from django.views.generic import TemplateView
from django.utils.decorators import method_decorator
from django.views.decorators.clickjacking import xframe_options_exempt
from django.contrib.staticfiles.templatetags.staticfiles import static

from infodistrictes.frontend import models


class HomeView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        super(HomeView, self).get_context_data(**kwargs)
        data = {
            'gender_age_data': models.GenderAge.get_data(),
            'nationality_data': models.Nationality.get_data(),
            'turistic_data': models.TuristicService.get_data(),
            'expenses_data': models.Expense.get_data(),
            'income_data': models.Income.get_data(),
            'expenses_data_scaped': models.Expense.get_data(scape=True),
            'income_data_scaped': models.Income.get_data(scape=True),
            'elections_data': models.Election.get_data(),
            'elections_data_scaped': models.Election.get_data(scape=True),
            'ecomuseumvisits_data': models.EcomuseumVisits.get_data(),
            'accommodations_data': models.AccommodationType.get_data(),
            'minors_data': models.Minors.get_data(),
            'unemployment_data': models.Unemployment.get_data(),
            'contracts_data': models.OpenContract.get_data(),
            'accomodation_csv_data': self.get_allotjaments_csv_data(),
            'restaurant_csv_data': self.get_restaurants_csv_data(),
        }

        return data

    def get_allotjaments_csv_data(self):
        data = []
        with open('{}{}'.format('deltebre/frontend/',
                                static('assets/maps_data/Allotjaments.csv')
                                ), newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile, quotechar='"')
            for row in reader:
                data.append({
                    'the_geom': html.escape(row['the_geom']),
                    'cartodb_id': html.escape(row['cartodb_id']),
                    'adreca': html.escape(row['adreca']),
                    'contacte': html.escape(row['contacte']),
                    'nom': html.escape(row['nom']),
                    'web': html.escape(row['web']),
                    'lng': html.escape(row['lng']),
                    'lat': html.escape(row['lat']),
                    'categoria': html.escape(row['categoria']),
                    'mascotes': html.escape(row['mascotes']),
                })

        return json.dumps(data)

    def get_restaurants_csv_data(self):
        data = []
        with open('{}{}'.format('deltebre/frontend/',
                                static('assets/maps_data/Restaurants.csv')
                                ), newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile, quotechar='"')
            for row in reader:
                data.append({
                    'the_geom': html.escape(row['the_geom']),
                    'web': html.escape(row['web']),
                    'nom': html.escape(row['nom']),
                    'adreca': html.escape(row['adreca']),
                    'contacte1': html.escape(row['contacte1']),
                    'contacte2': html.escape(row['contacte2']),
                    'cartodb_id': html.escape(row['cartodb_id']),
                    'correu': html.escape(row['correu']),
                    'lat': html.escape(row['lat']),
                    'lng': html.escape(row['lng']),
                    'categoria': html.escape(row['categoria']),
                    'cel1': html.escape(row['cel1']),
                    'cel2': html.escape(row['cel2']),
                })

        return json.dumps(data)


@method_decorator(xframe_options_exempt, name='dispatch')
class EmbedView(TemplateView):
    template_name = "embed.html"

    def get_context_data(self, **kwargs):
        super(EmbedView, self).get_context_data(**kwargs)
        include_string = self.kwargs['include_key']
        data = self.data_factory(include_string)

        return data

    def data_factory(self, keyword):
        if keyword == 'genere':
            return {'gender_age_data': models.GenderAge.get_data(),
                    'include': 'includes/genere.html'}
        if keyword == 'nacionalitat':
            return {'nationality_data': models.Nationality.get_data(),
                    'include': 'includes/nacionalitat.html'}
        if keyword == 'serveis':
            return {'turistic_data': models.TuristicService.get_data(),
                    'include': 'includes/serveis.html'}
        if keyword == 'visitants':
            return {'ecomuseumvisits_data': models.EcomuseumVisits.get_data(),
                    'include': 'includes/visitants.html'}
        if keyword == 'allotjaments':
            return {'accommodations_data': models.AccommodationType.get_data(),
                    'include': 'includes/allotjaments.html'}
        if keyword == 'despeses':
            return {'expenses_data': models.Expense.get_data(),
                    'include': 'includes/despeses.html'}
        if keyword == 'ingressos':
            return {'income_data': models.Income.get_data(),
                    'include': 'includes/ingressos.html'}
        if keyword == 'atur':
            return {'unemployment_data': models.Unemployment.get_data(),
                    'include': 'includes/atur.html'}
        if keyword == 'menors':
            return {'minors_data': models.Minors.get_data(),
                    'include': 'includes/menors.html'}
        if keyword == 'a21d17':
            return {'elections_data': models.Election.get_data(),
                    'include': 'includes/a21d17.html'}
        if keyword == 'a27s15':
            return {'elections_data': models.Election.get_data(),
                    'include': 'includes/a27s15.html'}
        if keyword == 'g26j16':
            return {'elections_data': models.Election.get_data(),
                    'include': 'includes/g26j16.html'}
        if keyword == 'g20d15':
            return {'elections_data': models.Election.get_data(),
                    'include': 'includes/g20d15.html'}
        if keyword == 'contractes':
            return {'contracts_data': models.OpenContract.get_data(),
                    'include': 'includes/contractes.html'}
        else:
            return None
