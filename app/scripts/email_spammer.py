# -*- coding: utf-8 -*-

from email.mime.text import *
import smtplib
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
import pymysql
import time

origen = "zombiespainstaff@gmail.com"  # Poned la dirección desde la que enviáis el correo.
mi_password = 'M0r3z0mb13s'
subject = u"Asunt'ó"
message = u"BLA BLA óA"
batch_size = 2
delay_in_sec = 10

def get_users():
    conn = pymysql.connect(host="mysql.zombiespain.es", user="freedom", passwd="F9r12v87", db="zombiespain")
    cur = conn.cursor()
    cur.execute("SELECT mail FROM usuarios")
    cur.close()
    conn.close()
    return cur

# Establecemos conexion con el servidor SMTP de la UDC.

mailServer = smtplib.SMTP('smtp.gmail.com', 587)  # Comentar los que no se utilicen ...
# -- mailServer = smtplib.SMTP ('smtp.udc.es', 25)
# -- mailServer = smtplib.SMTP ('smtp.uca.es', 25)
mailServer.ehlo()
mailServer.starttls()
mailServer.ehlo()

mailServer.login(origen, mi_password)

print ' Hemos conectado con el servidor'


users = get_users()

counter = 0

i = 0

for user in users:

	mensaje = MIMEMultipart()

	mensaje['From'] = origen
	mensaje['To'] = user[0].encode('latin1')
	mensaje['Subject'] = subject.encode('latin1')

	texto = message
	coding = 'latin-1'
	mensaje.attach(MIMEText(texto.encode('latin-1'), _charset='latin-1'))

	# Envio del mensaje

	mailServer.sendmail(origen, user[0], mensaje.as_string())


	print ' Hemos enviado el mensaje ', i + 1, ' a ', user[0]
	i += 1
	counter += 1

	if counter == batch_size:
		counter = 0
		print "Esperando ", delay_in_sec, " segundos"
		time.sleep(delay_in_sec)

mailServer.close()

