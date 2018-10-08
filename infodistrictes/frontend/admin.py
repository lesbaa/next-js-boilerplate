from django.contrib import admin
from django import forms

from infodistrictes.frontend import models


class GenderAgeForm(forms.ModelForm):
    GENDER_CHOICE = (('Homes', 'Homes'),
                     ('Dones', 'Dones'))
    AGE_CHOICE = (('0 - 9', '0 - 9'),
                  ('10 - 19', '10 - 19'),
                  ('20 - 29', '20 - 29'),
                  ('20 - 29', '20 - 29'),
                  ('30 - 39', '30 - 39'),
                  ('40 - 49', '40 - 49'),
                  ('50 - 59', '50 - 59'),
                  ('60 - 69', '60 - 69'),
                  ('70 - 79', '70 - 79'),
                  ('80 - 89', '80 - 89'),
                  ('90 - 99', '90 - 99'),
                  ('100 - 109', '100 - 109'))
    COLOR_CHOICE = (('#335271', 'Homes'), ('#CF494A', 'Dones'))

    genre = forms.ChoiceField(choices=GENDER_CHOICE)
    age = forms.ChoiceField(choices=AGE_CHOICE)
    color = forms.ChoiceField(choices=COLOR_CHOICE)


class AturForm(forms.ModelForm):
    GENDER_CHOICE = (('Homes', 'Homes'),
                     ('Dones', 'Dones'))
    gender = forms.ChoiceField(choices=GENDER_CHOICE)


class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('concept', 'chapter', 'budgeted', 'real', 'difference', 'color', 'year')


class GenderAgeAdmin(admin.ModelAdmin):
    fields = ('genre', 'age', 'count', 'color', 'year')
    list_display = ('genre', 'age', 'count', 'color', 'year')
    form = GenderAgeForm


class IncomeAdmin(admin.ModelAdmin):
    list_display = ('concept', 'chapter', 'budget', 'real', 'difference', 'color', 'year')


class NationalityAdmin(admin.ModelAdmin):
    list_display = ('name', 'total', 'year')


class TuristicServiceAdmin(admin.ModelAdmin):
    list_display = ('service', 'total', 'color', 'year')


class ElectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'year')


class ElectionVoteAdmin(admin.ModelAdmin):
    list_display = ('election', 'party', 'votes', 'percentage', 'color', 'image')


class EcomuseumVisitsAdmin(admin.ModelAdmin):
    list_display = ('month', 'year', 'visits', 'color')


class AccommodationTypeAdmin(admin.ModelAdmin):
    list_display = ('kind', 'capacity', 'number', 'color')


class MinorsAdmin(admin.ModelAdmin):
    list_display = ('trimester', 'number', 'amount', 'color')


class UnemploymentAdmin(admin.ModelAdmin):
    list_display = ('year', 'unemployment', 'gender', 'color')
    form = AturForm


class OpenContractAdmin(admin.ModelAdmin):
    list_display = ('description', 'amount', 'company', 'color')


admin.site.register(models.Expense, ExpenseAdmin)
admin.site.register(models.GenderAge, GenderAgeAdmin)
admin.site.register(models.Income, IncomeAdmin)
admin.site.register(models.Nationality, NationalityAdmin)
admin.site.register(models.TuristicService, TuristicServiceAdmin)
admin.site.register(models.Election, ElectionAdmin)
admin.site.register(models.ElectionVote, ElectionVoteAdmin)
admin.site.register(models.EcomuseumVisits, EcomuseumVisitsAdmin)
admin.site.register(models.AccommodationType, AccommodationTypeAdmin)
admin.site.register(models.Minors, MinorsAdmin)
admin.site.register(models.Unemployment, UnemploymentAdmin)
admin.site.register(models.OpenContract, OpenContractAdmin)

admin.site.site_header = 'Deltebre Administració'
