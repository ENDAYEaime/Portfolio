import pandas as pd

# Chargement des données brutes
df = pd.read_csv(
    "data/raw/evenements_openagenda_paris.csv"
)

print(
    "\nDimensions :",
    df.shape
)

# Vérifier présence colonne date
if "date" not in df.columns:

    print(
        "\nErreur : colonne 'date' absente"
    )

else:

    # Conversion date
    df["date"] = pd.to_datetime(
        df["date"],
        errors="coerce",
        utc=True
    )


    print(
        "\nDates nulles :"
    )

    print(
        df["date"]
        .isnull()
        .sum()
    )


    print(
        "\nAnnées présentes :"
    )

    print(

        df["date"]

        .dt.year

        .value_counts()

        .sort_index()

    )


    print(
        "\nDate minimum :"
    )

    print(
        df["date"]
        .min()
    )


    print(
        "\nDate maximum :"
    )

    print(
        df["date"]
        .max()
    )


    print(
        "\nAperçu :"
    )

    print(

        df[
            ["titre", "date"]
        ]

        .head()

    )