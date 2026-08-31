import streamlit as st
import httpx
import os

API_BASE_URL = os.getenv("API_URL", "http://localhost:8000")

st.set_page_config(
    page_title="AI LLM Qur'an & Hadits",
    page_icon="",
    layout="wide",
)

st.title("AI LLM Qur'an & Hadits")
st.caption("Asisten Keislaman berbasis AI dengan rujukan Al-Qur'an dan Hadits")

tab_chat, tab_quran, tab_hadith = st.tabs(["Chat AI", "Cari Ayat", "Cari Hadits"])

with tab_chat:
    st.header("Tanya Jawab Keislaman")

    if "messages" not in st.session_state:
        st.session_state.messages = []

    for msg in st.session_state.messages:
        with st.chat_message(msg["role"]):
            st.markdown(msg["content"])

    if prompt := st.chat_input("Ketik pertanyaan Anda..."):
        st.session_state.messages.append({"role": "user", "content": prompt})
        with st.chat_message("user"):
            st.markdown(prompt)

        with st.chat_message("assistant"):
            with st.spinner("Memproses..."):
                try:
                    response = httpx.post(
                        f"{API_BASE_URL}/api/chat",
                        json={"message": prompt},
                        timeout=60.0,
                    )
                    if response.status_code == 200:
                        result = response.json().get("response", "")
                        st.markdown(result)
                        st.session_state.messages.append(
                            {"role": "assistant", "content": result}
                        )
                    else:
                        st.error(f"Error: {response.text}")
                except Exception as e:
                    st.error(f"Gagal terhubung ke server: {e}")

with tab_quran:
    st.header("Cari Ayat Al-Qur'an")

    col1, col2 = st.columns(2)
    with col1:
        surah = st.number_input("Nomor Surah", min_value=1, max_value=114, value=1)
    with col2:
        ayat = st.number_input("Nomor Ayat", min_value=1, max_value=286, value=1)

    if st.button("Ambil Ayat", key="btn_quran"):
        with st.spinner("Mengambil data..."):
            try:
                response = httpx.post(
                    f"{API_BASE_URL}/api/quran/verse",
                    json={"surah": surah, "ayat": ayat},
                    timeout=10.0,
                )
                if response.status_code == 200:
                    data = response.json()
                    st.subheader(f"{data['surah']} ({data['nomor_surah']}:{data['nomor_ayat']})")
                    st.markdown(f"### {data['teks_arab']}")
                    st.caption(data["teks_latin"])
                    st.info(data["terjemahan"])
                else:
                    st.error("Ayat tidak ditemukan")
            except Exception as e:
                st.error(f"Gagal: {e}")

with tab_hadith:
    st.header("Cari Hadits")

    col1, col2 = st.columns(2)
    with col1:
        kitab = st.selectbox(
            "Pilih Kitab",
            ["bukhari", "muslim", "tirmidzi", "abu-daud", "nasai", "ibnu-majah"],
        )
    with col2:
        nomor = st.number_input("Nomor Hadits", min_value=1, max_value=7563, value=1)

    if st.button("Ambil Hadits", key="btn_hadith"):
        with st.spinner("Mengambil data..."):
            try:
                response = httpx.post(
                    f"{API_BASE_URL}/api/hadith",
                    json={"kitab": kitab, "nomor": nomor},
                    timeout=10.0,
                )
                if response.status_code == 200:
                    data = response.json()
                    st.subheader(f"{data['kitab']} - Hadits #{data['nomor']}")
                    st.markdown(f"### {data['teks_arab']}")
                    st.info(data["terjemahan"])
                else:
                    st.error("Hadits tidak ditemukan")
            except Exception as e:
                st.error(f"Gagal: {e}")
