import dash
from dash import dcc, html, Input, Output
import dash_bootstrap_components as dbc
import plotly.express as px
import pandas as pd

# Inicializar la app Dash
app = dash.Dash(__name__, external_stylesheets=[dbc.themes.COSMO])

# Datos principales para el dashboard
kpi_data = {
    "Número de Total de Test Cases ejecutados": 42,
    "Número de defectos identificados": 28,
    "Tiempo total de ejecución de pruebas": "15 horas-persona"
}

defect_data = pd.DataFrame({
    "Código": ["BG-JH-01", "BG-JH-02", "BG-JH-03"],
    "Descripción": [
        "Cuando se crea una arista conectada a sí misma, su peso no se mueve junto al elemento asociado",
        "Cuando se intenta solucionar el algoritmo de Johnson con un grafo incorrecto no sucede nada",
        "Cuando se intenta solucionar un grafo con un bucle, el algoritmo entra en un loop infinito"
    ],
    "Fecha detección": ["2024-03-15", "2024-06-01", "2024-10-15"],
    "Fecha resolución": ["2024-10-16", "2024-10-26", "2024-10-27"],
    "TMR (días)": [215, 147, 12],
    "Estado ejecución": ["Solved", "Solved", "Solved"]
})

defect_metrics = {
    "Total Bugs Detectados": 5,
    "Bugs Resueltos": 3,
    "Porcentaje Bugs Resueltos": "60%",
    "Tiempo Medio de Reparación": "33 días, 8 horas"
}

accessibility_data = pd.DataFrame({
    "Estado": ["Antes Corrección", "Después Corrección"],
    "Número de Alertas": [16, 7]
})

# Crear gráficos
bug_resolution_fig = px.bar(
    defect_data,
    x="Código",
    y="TMR (días)",
    color="Estado ejecución",
    title="Tiempo de Reparación de Bugs por Código",
    labels={"TMR (días)": "TMR (días)"},
    color_discrete_sequence=px.colors.qualitative.Pastel
)

accessibility_fig = px.line(
    accessibility_data,
    x="Estado",
    y="Número de Alertas",
    title="Reducción de Alertas de Accesibilidad",
    markers=True,
    color_discrete_sequence=px.colors.qualitative.Safe
)

test_cases_data = pd.DataFrame({
    "Resultado": ["Exitosos", "Fallidos"],
    "Cantidad": [33, 9]
})

test_cases_fig = px.pie(
    test_cases_data,
    names="Resultado",
    values="Cantidad",
    title="Proporción de Test Cases Exitosos vs Fallidos",
    color_discrete_sequence=px.colors.qualitative.Safe
)

coverage_data = pd.DataFrame({
    "Cobertura": ["Cubiertos", "No Cubiertos"],
    "Cantidad": [26, 7]
})

coverage_fig = px.pie(
    coverage_data,
    names="Cobertura",
    values="Cantidad",
    title="Cobertura de Pruebas en base a las HU",
    color_discrete_sequence=px.colors.qualitative.Bold
)
# Layout del Dashboard
app.layout = dbc.Container([
    html.H1("Resumen de Métricas de Pruebas", className="text-center my-4"),

    # KPI Section
    dbc.Row([
        dbc.Col(html.Div([
            html.H4(key),
            html.H5(value, className="text-primary")
        ]), width=2) for key, value in kpi_data.items()
    ], justify="center", className="mb-4"),

    # Automated Test Cases Section
    dbc.Row([
        dbc.Col([
            dbc.Card([
                dbc.CardBody([
                    html.H4("Test Cases Automatizados", className="card-title"),
                    html.P("14 Test Cases están ahora automatizados:", className="card-text"),
                    html.Ul([
                        html.Li([
                            dbc.Badge("4", color="success", className="ms-1"),
                            html.I(className="bi bi-check-circle-fill text-success me-2"),
                            "con Postman (Exitosos) ",
                            dbc.Badge("2", color="danger", className="ms-1"),
                            html.I(className="bi bi-x-circle-fill text-danger me-2"),
                            "con Postman (Fallidos)"
                        ]),
                        html.Li([
                            dbc.Badge("6", color="success", className="ms-1"),
                            html.I(className="bi bi-check-circle-fill text-success me-2"),
                            "con Playwright (Exitosos) ",
                            dbc.Badge("2", color="danger", className="ms-1"),
                            html.I(className="bi bi-x-circle-fill text-danger me-2"),
                            "con Playwright (Fallidos)"
                        ])
                    ])
                ])
            ], className="mb-4")
        ], width=12)
    ]),
    
     # Pie Charts
    dbc.Row([
        dbc.Col(dcc.Graph(figure=test_cases_fig), width=6),
        dbc.Col(dcc.Graph(figure=coverage_fig), width=6)
    ], className="mb-4"),

    # Gráficos
    dbc.Row([
        dbc.Col(dcc.Graph(figure=bug_resolution_fig), width=6),
        dbc.Col(dcc.Graph(figure=accessibility_fig), width=6)
    ], className="mb-4"),

    # Tabla de defectos
    dbc.Row([
        dbc.Col([
            html.H4("Defectos Identificados", className="mb-3"),
            dbc.Table.from_dataframe(defect_data, striped=True, bordered=True, hover=True, className="table")
        ], width=12)
    ])
], fluid=True)

if __name__ == "__main__":
    app.run_server(debug=True)