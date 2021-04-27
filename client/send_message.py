import psutil, json, time
from datetime import datetime
from clearblade.ClearBladeCore import System

def get_pc_state():
    results = {}
    results["time"] = datetime.utcnow().isoformat()
    results["cpu_usage"] = psutil.cpu_percent(10)
    return json.dumps(results)

# System credentials
SYSTEM_KEY = "<your_system_key>"
SYSTEM_SECRET = "<your_system_secrete>"



pc_state_system = System(SYSTEM_KEY, SYSTEM_SECRET)
adam = pc_state_system.User("<your_email>", "<your_password>")
mqtt = pc_state_system.Messaging(adam)

while True:
    pc_state = get_pc_state()
    mqtt.connect()
    mqtt.publish("pc_state", pc_state)
    mqtt.disconnect()
    time.sleep(900)

