import json
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

ROOT = Path(__file__).resolve().parents[2]
ENV_FILE = ROOT / ".env"
CONFIG_FILE = ROOT / "streaming/connectors/postgres-connector.json"

CONNECTOR_URL = (
    "http://localhost:8083/connectors/"
    "streamforge-postgres-connector/config"
)


def load_env(path):
    if not path.exists():
        raise FileNotFoundError(".env file not found.")

    values = {}

    for line in path.read_text().splitlines():
        line = line.strip()

        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        values[key.strip()] = value.strip().strip('"').strip("'")

    return values


def main():
    env = load_env(ENV_FILE)
    password = env.get("DEBEZIUM_DB_PASSWORD")

    if not password:
        raise ValueError("DEBEZIUM_DB_PASSWORD is missing from .env.")

    connector = json.loads(CONFIG_FILE.read_text())
    config = connector["config"]

    config["database.password"] = password

    payload = json.dumps(config).encode("utf-8")

    request = Request(
        CONNECTOR_URL,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="PUT",
    )

    try:
        with urlopen(request, timeout=15) as response:
            print("Connector configuration updated successfully.")
            print("HTTP status:", response.status)

    except HTTPError as error:
        print("Kafka Connect returned HTTP status:", error.code)
        print(error.read().decode("utf-8"))
        raise

    except URLError as error:
        print("Could not connect to Kafka Connect:", error.reason)
        raise


if __name__ == "__main__":
    main()
