<table align="center"><tr><td align="center" width="9999">

## LAPORAN
## TUGAS BESAR SISTEM TERDISTRIBUSI
## GAME PING-PONG
#

<img src="https://gitlab.com/share424/ping-pong-game/raw/laporan/aset%20photo/TelkomU.png" align="center" width="150" alt="Project icon">

#

##### OLEH :

##### Made Raharja Surya Mahadi	1301160039
##### M. Restu Assegaf	1301164198
##### Johan Antonius Salim	1301164150
##### Dedih Kurnia	1301164077

# 
##### DOSEN:
##### Aulia Arif Wardana S.Kom., M.T.
#
#
#
## FAKULTAS TEKNIK INFORMATIKA
## UNIVERSITAS TELKOM
## 2019
#

</td></tr></table>

#### 1.	PENDAHULUAN
Game merupakan media hiburan yang menarik. Perkembangan game sangat pesat dalam mengikuti pekembangan persaingan teknologi, Game 2 dimensi mengalami perkembangan yang tak kalah dengan game 3 dimensi, khususnya dari segi grafis yang semakin bagus, juga permainan yang semakin komplek. Peminat game 2 dimensi masih banyak dan yang paling diminati, karena itu penulis lebih memilih game 2 dimensi dengan judul the ping pong master
Game The Ping-Pong Master merupakan game yang bergenre Simulation. Game ini terinspirasi dari salah suatu cabang olahraga yang dimainkan oleh dua orang yang berlawanan yang dimainkan secara onlien melalui sebuah jaringan, pengguna harus berusaha mencoba untuk mengalahkan lawan mainnya agar dapat menempati posisi dan nilai tertinggi, game ini di buat dengan berbasis tampilan website.  Untuk memainkan dan memenangkan permainan ini pengguna harus lebih teliti dalam melihat kemana arah bola(puck) untuk mengarahkan karaternya/pemukul(mallet) mendekati arah bola(puck) dan memukul bola(puck)  ke arah lawan.   
#
#### 2.	Analisis Kebutuhan Perangkat Keras(Hardware)
Perangkat keras(Hardware) yang dibutuhkan sebagai sarana penunjang berupa seperangkat personal computer dengan spesifikasi sebagai berikut : 
#### Maximum recommended : 
###### a.	 Processor 	: Intel(R) Atom(TM) CPU N2800 @3.00GHz (2 CPUs), ~3.0GHz
###### b.	Memory		: 2048MB RAM 
###### c.	Sistem Operasi	: Windows 7 Ultimate 32-bit (6.1, Build 7601) 
#### Minimum recommended :
###### a.	Processor  		: Intel(R) PentiumCPU E-5700@1.86GHz (4 CPUs), ~1.9GHz
###### b.	Memory  		: 512MB RAM 3. 
###### c.	Sistem Operasi	: Windows 7 Ultimate 32-bit (6.1, Build 7600) Dengan mengunakan kebutuhan personal computer seperti diatas diharapan penguna system dapat dengan lancar dalam memainkan game ini. 
#
#### 3.	Analisis Kebutuhan Perangkat lunak(software)
Perangakat lunak(software) yang digunakan dalam pembuatan game The PingPong Master adalah sebagai berikut : 
###### a.	Linux Ubuntu 
###### b.	Web socket
###### c.	Browser
#
#### 4.	CARA KERJA
###### a.	Pertama mengaktifkan server.
###### b.	Player menghubungkan ke server.
###### c.	Player yang lebih dulu masuk ke dalam game akan mendapati pop up yang menanyakan apakah dia player 1 atau bukan (jika menekan “ok” akan menjadi player 1, jika menekan “cancel” maka player tersebut tidak bermain.
###### d.	Player yang menekan “ok” pada pop up akan menjadi player 1, sedangkan player yang menekan “cancel” setelah player lain menekan “ok” akan menjadi player 2.
#
#### 5.	DOKUMENTASI & SIMULASI
#### a. Pertama-tama sebelum membuka program kita harus mengaktifkan server cara menjalankannya yaitu buka cmd/terminal linux kemudian ketik python3 server.py kemudian RUN.
![alt text](https://gitlab.com/share424/ping-pong-game/raw/laporan/aset%20photo/A.png)
#
#
#### b. Setelah di run dan tidak terjadi error kemudian masuk ke folder ping-pong-game-master->client kemudian cari file client.html kemudian buka.
![alt text](https://gitlab.com/share424/ping-pong-game/raw/laporan/aset%20photo/B.png)
#
#
#### c. Setelah terbuka pilih jenis player yang di inginkan apakah akan jadi Player 1 atau Player 2.
![alt text](https://gitlab.com/share424/ping-pong-game/raw/laporan/aset%20photo/C.png)
#
#
#### d. jika telah terbuka tampilan seperti di bawah :
![alt text](https://gitlab.com/share424/ping-pong-game/raw/laporan/aset%20photo/D.PNG)
####  maka ulangi langkah B & C dan pilihlah jenis player yang berbeda.
![alt text](https://gitlab.com/share424/ping-pong-game/raw/laporan/aset%20photo/E.png)
#
#
#### e. Jika client 1 dan client 2 telah terhubung kemudian tekan "SPASI" untuk menampilkan bola dan memulai permainan, kemudian tekan pada keyboard huruf "A" untuk memindahkan bat/mallet ke atas. kemudian tekan huruf "D" untuk memindahkan bat/mallet ke bawah.
![alt text](https://gitlab.com/share424/ping-pong-game/raw/laporan/aset%20photo/F.png)
#
#
#### f. Jika kita melihat di sisi server, server akan menerima data dari player 1 dan 2.
![alt text](https://gitlab.com/share424/ping-pong-game/raw/laporan/aset%20photo/2.PNG)
#
#